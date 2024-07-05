import { observer } from "mobx-react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	showPassword: boolean
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function ShowOrHidePasswordButton (props: Props) {
	const { showPassword, setShowPassword } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			onClickAction={() => setShowPassword(!showPassword)}
			classes="absolute flex items-center justify-center right-0.5"
			top="39%"
		>
			{showPassword ? (
				<FaEye style={{ color: defaultSiteTheme === "dark" ? "white" : "" }} />
			) : (
				<FaEyeSlash style={{ color: defaultSiteTheme === "dark" ? "white" : "" }} />
			)}
		</HoverOutlineComponent>
	)
}

export default observer(ShowOrHidePasswordButton)
