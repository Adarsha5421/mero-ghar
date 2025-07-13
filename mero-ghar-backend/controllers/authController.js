const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isStrongPassword } = require('../utils/validators');
const { logActivity } = require('../services/logService');
const sendEmail = require('../utils/sendEmail'); // Import the utility

const crypto = require('crypto');


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                message:
                    'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const newUser = await User.create({ name, email, password, role });
        await logActivity({ req, user: newUser, action: 'User Registration', statusCode: 201 });

        res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(newUser),
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        await logActivity({ req, user, action: 'User Login', statusCode: 200 });


        res.json({
            message: 'Login successful',
            token: generateToken(user),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user with that email' });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        user.resetPasswordToken = tokenHash;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Create reset URL
        const resetUrl = `http://localhost:5173/reset-password/${token}`; // Use your frontend URL

        // Design the HTML email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                <p style="font-size: 16px; color: #555;">Hi ${user.name},</p>
                <p style="font-size: 16px; color: #555;">
                    We received a request to reset your password for your MeroGhar account. Please click the button below to set a new password.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #ff385c; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">Reset Your Password</a>
                </div>
                <p style="font-size: 16px; color: #555;">
                    If you did not request a password reset, please ignore this email. This link is valid for 1 hour.
                </p>
                <hr>
                <p style="font-size: 12px; color: #999; text-align: center;">MeroGhar | Your Home Away From Home</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your MeroGhar Password Reset Link',
                html: emailHtml,
            });

            res.status(200).json({ message: 'Reset token has been sent to your email.' });

        } catch (err) {
            console.error('Email sending error:', err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ error: 'Email could not be sent. Please try again.' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken: tokenHash,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

        user.password = password; // will be hashed by pre-save hook
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: 'Password has been reset successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};



