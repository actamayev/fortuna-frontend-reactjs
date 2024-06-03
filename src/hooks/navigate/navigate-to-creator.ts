import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToCreator(): (creatorUsername: AtPrefixedString) => void {
	const navigate = useTypedNavigate()

	const navigateToVideo = useCallback((creatorUsername: AtPrefixedString): void => {
		navigate(`/c/${creatorUsername}`)
	}, [navigate])

	return navigateToVideo
}
