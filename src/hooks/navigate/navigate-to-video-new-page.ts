import { useCallback } from "react"

export default function useNavigateToVideoNewPage(): (videoUUID: string) => void {
	return useCallback((videoUUID: string): void => {
		window.open(`/v/${videoUUID}`, "_blank", "noopener,noreferrer")
	}, [])
}
