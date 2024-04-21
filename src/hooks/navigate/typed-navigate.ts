import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export default function useTypedNavigate (): (route: PageNames) => void {
	const navigate = useNavigate()

	const typedNavigate = useCallback((route: PageNames): void => {
		navigate(route)
	}, [navigate])

	return typedNavigate
}
