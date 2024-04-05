import _ from "lodash"
import { useEffect } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import useTypedNavigate from "../typed-navigate"

export default function useRedirectKnownUser (): void  {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (_.isNil(authClass.accessToken)) return
		navigate("/my-ownership")
	}, [authClass.accessToken, navigate])
}
