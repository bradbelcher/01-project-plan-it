/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const forms = require('@tailwindcss/forms');
module.exports = {
    content: ["./index.html", "./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
    ],

};
