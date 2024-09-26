import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./constants/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                pink: {
                    100: '#fd356e'
                },
                gray: {
                    10: 'rgba(0, 0, 0, .1)',
                    50: '#7b7b7b',
                    100: '#57575c'
                },
                black: {
                    text: '#19191c',
                    mid: '#232325e6'
                },
                white: {
                    bg: '#f9f9fa',
                    border: 'rgba(255, 255, 255, .1)'
                }
            }
        }
    }
} satisfies Config;

export default config