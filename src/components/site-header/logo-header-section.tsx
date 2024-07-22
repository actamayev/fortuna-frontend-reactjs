import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function LogoHeaderSection() {
	const defaultSiteTheme = useDefaultSiteTheme()
	const authClass = useAuthContext()

	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl flex-shrink-0 text-zinc-950
				dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
			>
				<img
					src={defaultSiteTheme === "dark" ? "/fortuna-logo-white.svg" : "/fortuna-logo-black.svg"}
					alt="Logo"
					className="ml-1"
					style={{ height: "40px", verticalAlign: "middle" }}
				/>
				<span className="ml-2">Fortuna</span>
			</Link>
			{!authClass.isLoggedIn && (
				<div
					className="ml-2.5 mt-2 p-1.5 rounded-[3px] cursor-pointer
					bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-800 text-zinc-950"
				>
					<a
						href="https://help.createfortuna.com"
						aria-label="Help Center"
						target="_blank"
						rel="noopener noreferrer"
					>
						How it works
					</a>
				</div>
			)}
		</div>
	)
}

export default observer(LogoHeaderSection)
