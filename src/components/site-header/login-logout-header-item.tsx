import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import NullUserNavLink from "../null-user-nav-link"
import { useAuthContext } from "../../contexts/auth-context"
import HeaderDropdown from "./profile-dropdown/header-dropdown"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function LoginLogoutHeaderItem() {
	const authClass = useAuthContext()
	const location = useLocation()
	const personalInfoClass = usePersonalInfoContext()

	const username = useMemo(() => {
		return personalInfoClass.username
	}, [personalInfoClass.username])

	if (authClass.isLoggedIn === false) {
		if (location.pathname === "/register" || location.pathname === "/login") {
			return null
		}
		return <NullUserNavLink />
	}

	if (_.isNull(username)) return null

	return <HeaderDropdown />
}

export default observer(LoginLogoutHeaderItem)
