import _ from "lodash"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

const PrivatePageNames = [
	"/my-ownership",
	"/my-wallet",
	"/my-profile",
	"/creator/my-content",
	"/creator/my-wallet",
	"/creator/upload-content"
]

// This hook exists to make sure that Google users who have not registered their username are unable to go to private pages
export default function useRedirectBackToRegisterUsername (): void  {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const location = useLocation()
	const navigate = useTypedNavigate()

	useEffect(() => {
		// If the user isn't logged in, return
		if (_.isNull(authClass.accessToken) || _.isNull(personalInfoClass)) return
		// If the user has a username, or doesn't have an email, return
		if (!_.isNull(personalInfoClass.username) || _.isNull(personalInfoClass.email)) return
		if (PrivatePageNames.includes(location.pathname) === false) return
		navigate("/register-username")
	}, [authClass.accessToken, location.pathname, navigate, personalInfoClass, personalInfoClass?.username, personalInfoClass?.email])
}
