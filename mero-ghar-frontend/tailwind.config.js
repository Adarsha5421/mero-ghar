/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'airbnb-pink': '#FF385C',
                'airbnb-pink-dark': '#E61E4D',
            }
        },
    },
    plugins: [],
}
