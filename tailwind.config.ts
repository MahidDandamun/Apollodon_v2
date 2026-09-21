import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			surface: {
  				base: 'hsl(var(--surface-base))',
  				card: 'hsl(var(--surface-card))',
  				elevated: 'hsl(var(--surface-elevated))',
  				hover: 'hsl(var(--surface-hover))',
  			},
  			text: {
  				primary: 'hsl(var(--text-primary))',
  				secondary: 'hsl(var(--text-secondary))',
  				tertiary: 'hsl(var(--text-tertiary))',
  			},
  			status: {
  				normal: 'hsl(var(--status-normal))',
  				warning: 'hsl(var(--status-warning))',
  				critical: 'hsl(var(--status-critical))',
  			},
  			ocean: {
  				300: 'hsl(var(--color-ocean-300))',
  				400: 'hsl(var(--color-ocean-400))',
  				500: 'hsl(var(--color-ocean-500))',
  				600: 'hsl(var(--color-ocean-600))',
  				700: 'hsl(var(--color-ocean-700))',
  				800: 'hsl(var(--color-ocean-800))',
  			},
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
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				subtle: 'hsl(var(--border-subtle))',
  				interactive: 'hsl(var(--border-interactive))',
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			map: {
  				bg: 'hsl(var(--color-map-bg))',
  				grid: 'hsl(var(--color-map-grid))',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: ['var(--font-inter)'],
  			heading: ['var(--font-jakarta)'],
  			mono: ['var(--font-mono)'],
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			'pulse-slow': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.7' },
  			},
  			'ripple': {
  				'0%': { transform: 'scale(0.8)', opacity: '1' },
  				'100%': { transform: 'scale(2)', opacity: '0' },
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 0.5s ease-out forwards',
  			'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  			'ripple': 'ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
