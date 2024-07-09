import { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import aspectRatio from "@tailwindcss/aspect-ratio"

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	darkMode: "class",
	plugins: [
		aspectRatio,
	],
}

export default config
