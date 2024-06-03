import { useState } from "react"
import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useSetDefaultSiteTheme from "../hooks/personal-info/set-default-site-theme"

function ChooseSiteTheme() {
	const defaultSiteTheme = useDefaultSiteTheme()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()
	const [isHovered, setIsHovered] = useState(false)

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
			{defaultSiteTheme === "light" ? (
				<IoMdSunny />
			) : (
				<FaMoon color="white" />
			)}
		</div>
	)
}

export default observer(ChooseSiteTheme) // Keep this an observer (the defaultSiteTheme is a memo)
