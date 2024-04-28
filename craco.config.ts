// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MillionLint from "@million/lint"
import million from "million/compiler"

module.exports = {
	typescript: {
		enableTypeChecking: true
	},
	eslint: {
		enable: true
	},
	webpack: {
		plugins: { add: [million.webpack({ auto: true })] },
	},
}
