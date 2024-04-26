import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToVideo(): (videoUUID: string) => void {
	const navigate = useTypedNavigate()

	const navigateToVideo = useCallback((videoUUID: string): void => {
		navigate(`/v/${videoUUID}`)
	}, [navigate])

	return navigateToVideo
}
