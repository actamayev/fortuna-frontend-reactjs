import { useNavigate } from "react-router-dom"

export default function useTypedNavigate (): (route: PageNames) => void {
	const navigate = useNavigate()

	const typedNavigate = (route: PageNames): void => {
		navigate(route)
	}

	return typedNavigate
}
