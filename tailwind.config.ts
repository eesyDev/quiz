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
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
				blackOpacity: 'rgba(0, 0, 0, 0.8)',
    			pink: {
    				'100': '#fd356e'
    			},
    			gray: {
    				'10': 'rgba(0, 0, 0, .1)',
    				'50': '#7b7b7b',
    				'100': '#57575c'
    			},
    			black: {
    				text: '#19191c',
    				mid: '#232325e6'
    			},
    			white: {
					main: '#fff',
    				bg: '#f9f9fa',
    				border: 'rgba(255, 255, 255, .1)'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
				
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
			spacing: {
				'128': '32rem',
			},
			keyframes: {
				'fade-in': {
				  '0%': { opacity: '0' },
				  '100%': { opacity: '1' },
				},
				'fade-out': {
				  '0%': { opacity: '1' },
				  '100%': { opacity: '0' },
				},
			  },
			  animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
			  },
    	}
    },
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/forms')]
} satisfies Config;

export default config