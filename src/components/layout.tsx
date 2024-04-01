import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import useLogout from "../hooks/auth/logout"
import CustomLink, { TopNavLink } from "./custom-link"
import { isErrorResponse } from "../utils/type-checks"
import { useAuthContext } from "../contexts/auth-context"
import { useApiClientContext } from "../contexts/fortuna-api-client-context"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props
	const fortunaApiClient = useApiClientContext()
	const authClass = useAuthContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const location = useLocation()
	const logout = useLogout()

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): Promise<void> => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			const response = await fortunaApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			fortunaApiClient.logout()
			logout()
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}

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
			if (location.pathname === "/login") {
				return <TopNavLink href = "/register" title = "Register"/>
			} else {
				return <TopNavLink href = "/login" title = "Login"/>
			}
		}
		return (
			<TopNavLink
				href = "/"
				title = "Logout"
				onClick={handleLogout}
				disabled = {logoutDisabled}
			/>
		)
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
