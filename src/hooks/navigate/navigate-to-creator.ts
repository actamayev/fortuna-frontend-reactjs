import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToCreator(): (creatorUsername: string) => void {
	const navigate = useTypedNavigate()

	const navigateToVideo = useCallback((creatorUsername: string): void => {
		navigate(`/c/${creatorUsername}`)
	}, [navigate])

	return navigateToVideo
}
