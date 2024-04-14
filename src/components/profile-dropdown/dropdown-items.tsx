import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import useLogout from "../../hooks/auth/logout"
import { isErrorResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

function DropdownItems () {
	const fortunaApiClient = useApiClientContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const logout = useLogout()

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			const response = await fortunaApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			fortunaApiClient.logout()
			logout()
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}

	const unboldedDropdownItemCSS = "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-100"

	return (
		<>
			<Link to="/my-ownership" className={unboldedDropdownItemCSS} role="menuitem">My Ownership</Link>
			<Link to="/my-wallet" className={unboldedDropdownItemCSS} role="menuitem">My Wallet</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className = {unboldedDropdownItemCSS + " w-full text-left"}
					role = "menuitem"
					disabled={logoutDisabled}
				>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(DropdownItems)
