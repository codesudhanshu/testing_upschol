/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	mode: 'jit',
	content: ["./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",],
	theme: {
		extend: {
			height: {
				'128': '32rem',
				'142': '43rem',
				'190': '50rem',
				'250': '60rem',
				'50vh': '50vh',
				'60vh': '60vh',
				'70vh': '70vh',
			},
			padding: {
				'50px': '50px',
			},
			width: {
				'128': '32rem',
			},
			fontSize: {
				'xxs':'9px'
			},
			margin: {
				'450': '450px',
			},
			colors:{
				'background_color':"#14081E",
				'primary':"#6941C6",
				'secondary':"#F4EBFF",
				'black-2':"#101828",
				'gray':'#667085'
			},
			backgroundColor:{
				purple:"#7F56D9"
			},
			boxShadow: {
				"custom": 'rgba(0, 0, 0, 0.25)_0px_54px_55px,rgba(0, 0, 0, 0.12)_0px_-_12px_30px,rgba(0, 0, 0, 0.12)_0px_4px_6px,rgba(0, 0, 0, 0.17)_0px_12px_13px,rgba(0, 0, 0, 0.09)_0px -_3px_5px;'
			},
			gridTemplateRows: {
				'auto': 'max-content',
			},
			translate: {
				'full': '160%',
			},
			minHeight: {
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'7': '1.75rem',
				'8': '2rem',
			},
			minWidth: {
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'7': '1.75rem',
				'8': '2rem',
			},
		}
	},
	plugins: [],
}
