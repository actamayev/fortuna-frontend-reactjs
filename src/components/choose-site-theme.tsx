import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import useSetDefaultSiteTheme from "../hooks/personal-info/set-default-site-theme"

// TODO: Make this a slider
function ChooseSiteTheme() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()
	const [isHovered, setIsHovered] = useState(false)

	if (_.isNull(personalInfoClass)) return null

	return (
		<div
			className="relative cursor-pointer flex items-center justify-center"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: isHovered ? "rgba(128, 128, 128, 0.2)" : "transparent",
				borderRadius: "50%",
				cursor: "pointer",
			}}
			onClick={setDefaultSiteTheme}
		>
			{personalInfoClass.defaultSiteTheme === "dark" ? (
				<FaMoon color="white" />
			) : (
				<IoMdSunny />
			)}
		</div>
	)
}

export default observer(ChooseSiteTheme)
