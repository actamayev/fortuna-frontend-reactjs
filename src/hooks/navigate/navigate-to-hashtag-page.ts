import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"

export default function useNavigateToHashtagPage(): (hashtag: string) => void {
	const navigate = useTypedNavigate()

	return useCallback((hashtag: string): void => {
		navigate(`/hashtag/${hashtag}`)
	}, [navigate])
}
