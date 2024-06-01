import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function LogoHeaderSection() {
	const personalInfoClass = usePersonalInfoContext()

	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center text-zinc-900 dark:text-zinc-200 \
					font-semibold text-3xl flex-shrink-0 hover:text-blue-500"
			>
				{personalInfoClass && (
					<img
						src={personalInfoClass.defaultSiteTheme === "dark" ? "/fortuna-logo-white.svg" : "/fortuna-logo-black.svg"}
						alt="Logo"
						className="mt-2"
						style={{ height: "60px" }}
					/>
				)}
				Fortuna
			</Link>
		</div>
	)
}

export default observer(LogoHeaderSection)
