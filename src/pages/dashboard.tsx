import { useCallback } from "react"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import Button from "../components/button"
import useLogout from "../hooks/auth/logout"
import { useApiClientContext } from "../contexts/fiftyone-api-client-context"

function Dashboard() {
	const navigate = useNavigate()
	const apiClient = useApiClientContext()
	const logout = useLogout()

	const handleLogout = useCallback(async () => {
		try {
			await apiClient.authDataService.logout()
			logout()
			navigate("/login")
		} catch (error) {
			console.error(error)
		}
	}, [apiClient.authDataService, logout, navigate])

	return (
		<div>
			Dashboard
			<Button
				title="Logout"
				colorClass="bg-red-500"
				hoverClass="hover:bg-red-600"
				onClick={handleLogout}
			/>
		</div>
	)
}

export default observer(Dashboard)
