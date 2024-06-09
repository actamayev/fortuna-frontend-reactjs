import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import HoverOutlineComponent from "./hover-outline-component"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useSetDefaultSiteTheme from "../hooks/personal-info/set-default-site-theme"

function ChooseSiteTheme() {
	const defaultSiteTheme = useDefaultSiteTheme()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	return (
		<HoverOutlineComponent id="theme-toggler" onClickAction={setDefaultSiteTheme}>
			{defaultSiteTheme === "light"
				? (<IoMdSunny />)
				: (<FaMoon color="white" />)
			}
		</HoverOutlineComponent>
	)
}

export default observer(ChooseSiteTheme) // Keep this an observer (the defaultSiteTheme is a memo)
