import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToVideoPage(): (videoUUID: string) => void {
	const navigate = useTypedNavigate()

	return useCallback((videoUUID: string): void => {
		navigate(`/v/${videoUUID}`)
	}, [navigate])
}
