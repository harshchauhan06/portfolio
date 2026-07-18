import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // Powers font-sans / font-serif utilities used across Hero.jsx and Navbar.jsx
                sans: ["Manrope", ...defaultTheme.fontFamily.sans],
                serif: ["Fraunces", ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [],
};