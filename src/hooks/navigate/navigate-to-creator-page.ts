import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToCreatorPage(): (creatorUsername: AtPrefixedString) => void {
	const navigate = useTypedNavigate()

	const navigateToCreatorPage = useCallback((creatorUsername: AtPrefixedString): void => {
		navigate(`/c/${creatorUsername}`)
	}, [navigate])

	return navigateToCreatorPage
}
