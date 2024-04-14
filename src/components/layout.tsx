import _ from "lodash"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import CustomLink, { TopNavLink } from "./custom-link"
import { useAuthContext } from "../contexts/auth-context"
import HeaderDropdown from "./profile-dropdown/header-dropdown"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props
	const authClass = useAuthContext()
	const location = useLocation()

	const LinkToHome = observer(() => {
		return (
			<CustomLink
				href="/"
				title="Fortuna"
				css = "text-gray-200 hover:text-white font-bold text-xl"
			/>
		)
	})

	const LoginLogout = observer(() => {
		if (_.isNull(authClass.accessToken)) {
			if (location.pathname === "/register") {
				return <TopNavLink href = "/login" title = "Login"/>
			} else {
				return <TopNavLink href = "/register" title = "Register"/>
			}
		}
		return <HeaderDropdown />
	})

	return (
		<div>
			<nav className="bg-black">
				<div className="flex justify-between h-16">
					<div className="flex items-center ml-4">
						<LinkToHome />
					</div>
					<div className="flex items-center mr-4">
						<LoginLogout />
					</div>
				</div>
			</nav>
			<div className="flex flex-row">
				<div className="flex-1 w-full bg-white overflow-y-auto px-10 py-8">
					{children}
				</div>
			</div>
		</div>
	)
}
