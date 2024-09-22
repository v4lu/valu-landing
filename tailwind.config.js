const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const svgToDataUri = require('mini-svg-data-uri');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1.25rem',
					xl: '1rem'
				},
				screens: {
					xl: '83rem'
				}
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))'
				},
				muted: {
					foreground: 'hsl(var(--muted-foreground))'
				}
			},
			backgroundImage: {
				'header-border':
					'radial-gradient(62.87% 100% at 50% 100%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
				'hero-title': 'linear-gradient(180deg,#fff 0%,rgba(255,255,255,.7) 100%)',
				'badge-text':
					'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(90.01deg, #e59cff 0.01%, #ba9cff 50.01%, #9cb2ff 100%)'
			},
			boxShadow: {
				'button-shadow': 'inset 0 0 12px #bf97ff3d',
				'badge-shadow': 'inset 0 -7px 11px #a48fff1f'
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				fadeDown: {
					'0%': { opacity: '0', transform: 'translateY(-50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},

				fadeRight: {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				fadeLeft: {
					'0%': { opacity: '0', transform: 'translateX(50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-from-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				heroBlackHoleStarsRotate: {
					'0%': {
						transform: 'translateZ(0) translate(-50%, -50%) rotate(0deg)'
					},
					'100%': {
						transform: 'translateZ(0) translate(-50%, -50%) rotate(-360deg)'
					}
				}
			},
			animation: {
				'slide-from-right': 'slide-from-right 0.5s ease-in-out',
				'hero-black-hole-stars-rotate': 'heroBlackHoleStarsRotate 70s linear infinite',
				'fade-up': 'fadeUp 1.5s cubic-bezier(0.44, 1, 0.36, 1)',
				'fade-down': 'fadeDown 1.5s cubic-bezier(0.44, 1, 0.36, 1)',
				'fade-right': 'fadeRight 1.5s cubic-bezier(0.44, 1, 0.86, 1)',
				'fade-left': 'fadeLeft 1.5s cubic-bezier(0.44, 1, 0.86, 1)'
			},
			transitionTimingFunction: {
				cubic: 'cubic-bezier(0.6,0.6,0,1)'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-animate'),
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'bg-grid': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke-width="2" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`
					})
				},
				{ values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
			);
		}
	]
};
