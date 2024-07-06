// eslint-disable-next-line filenames/match-regex, no-undef, @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")
export const content = ["./src/**/*.{js,ts,jsx,tsx}"]
export const theme = {
	extend: {
		fontFamily: {
			sans: ["Inter var", ...defaultTheme.fontFamily.sans],
		},
	}
}
export const darkMode = "class"
export const plugins = []
