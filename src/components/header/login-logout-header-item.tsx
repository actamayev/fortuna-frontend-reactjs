import _ from "lodash"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import { TopNavLink } from "../custom-link"
import { useAuthContext } from "../../contexts/auth-context"
import HeaderDropdown from "./profile-dropdown/header-dropdown"

function LoginLogoutHeaderItem() {
	const authClass = useAuthContext()
	const location = useLocation()

	if (_.isNull(authClass.accessToken)) {
		if (location.pathname === "/register") {
			return <TopNavLink href = "/login" title = "Login"/>
		} else {
			return <TopNavLink href = "/register" title = "Register"/>
		}
	}
	return <HeaderDropdown />
}

export default observer(LoginLogoutHeaderItem)
