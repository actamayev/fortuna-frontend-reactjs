import _ from "lodash"
import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import useSetDefaultSiteTheme from "../hooks/personal-info/set-default-site-theme"

// TODO: Make this a slider
function ChooseSiteTheme() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	if (_.isNull(personalInfoClass)) return null

	return (
		<div>
			{personalInfoClass.defaultSiteTheme === "dark" && <IoMdSunny onClick={setDefaultSiteTheme}/>}
			{personalInfoClass.defaultSiteTheme === "light" && <FaMoon onClick={setDefaultSiteTheme}/>}
		</div>
	)
}

export default observer(ChooseSiteTheme)
