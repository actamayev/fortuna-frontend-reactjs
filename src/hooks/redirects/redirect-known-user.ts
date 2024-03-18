import _ from "lodash"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"

export default function useRedirectKnownUser (): void  {
	const authClass = useAuthContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (_.isNil(authClass.accessToken)) return
		navigate("/events-dashboard")
	}, [authClass.accessToken, navigate])
}
