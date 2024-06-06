import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { Link, useLocation } from "react-router-dom"
import { FaVideo } from "react-icons/fa"
import { useAuthContext } from "../../contexts/auth-context"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function CreateContentHeaderButton() {
	const location = useLocation()
	const defaultSiteTheme = useDefaultSiteTheme()
	const authClass = useAuthContext()
	const [isHovered, setIsHovered] = useState(false)

	if (
		_.isNull(authClass.accessToken) ||
		location.pathname === "/creator/create-content"
	) return null

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: isHovered ? "rgba(128, 128, 128, 0.2)" : "transparent",
				borderRadius: "50%",
				cursor: "pointer"
			}}
			className="inline-flex items-center justify-center flex-grow flex-shrink relative cursor-pointer"
		>
			<Link
				to="/creator/create-content"
				className="w-full"
			>
				<div
					className="rounded h-9 flex items-center justify-center"
				>
					<FaVideo color = {defaultSiteTheme === "dark" ? "white" : ""}/>
				</div>
			</Link>
		</div>
	)
}

export default observer(CreateContentHeaderButton)
