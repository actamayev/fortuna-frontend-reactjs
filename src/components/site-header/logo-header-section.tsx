import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function LogoHeaderSection() {
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl flex-shrink-0"
			>
				<img
					src={defaultSiteTheme === "dark" ? "/fortuna-logo-white.svg" : "/fortuna-logo-black.svg"}
					alt="Logo"
					className="ml-1"
					style={{ height: "40px", verticalAlign: "middle" }}
				/>
				<span className="ml-2 text-zinc-900 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400">
					Fortuna
				</span>
			</Link>
		</div>
	)
}

export default observer(LogoHeaderSection) // Keep this an observer (defaultSiteTheme needs to be observed)
