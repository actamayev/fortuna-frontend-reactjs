
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import useHandleLogout from "../../hooks/auth/handle-logout"

export default function DropdownItems () {
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)

	const unboldedDropdownItemCSS = useMemo(() => "text-gray-700 block px-4 py-2 text-md hover:bg-gray-200 transition-all duration-100", [])

	return (
		<>
			<Link to="/my-ownership" className={unboldedDropdownItemCSS} role="menuitem">My Ownership</Link>
			<Link to="/my-wallet" className={unboldedDropdownItemCSS} role="menuitem">My Wallet</Link>
			<Link to="/creator/my-content" className={unboldedDropdownItemCSS} role="menuitem">My Content</Link>
			<Link to="/my-profile" className={unboldedDropdownItemCSS} role="menuitem">My Profile</Link>
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
