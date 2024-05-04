import _ from "lodash"
import { useEffect } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectUserWithUsername (): void  {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (_.isNull(authClass.accessToken) || _.isNull(personalInfoClass)) {
			navigate("/")
			return
		}
		if (_.isNull(personalInfoClass.username)) return
		navigate("/my-ownership")
	}, [authClass.accessToken, navigate, personalInfoClass, personalInfoClass?.username])
}
