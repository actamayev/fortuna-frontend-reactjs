import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function ProfileDropdownItems() {
	const personalInfoClass = usePersonalInfoContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)

	const unboldedDropdownItemCSS = useMemo(() => "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-50", [])

	return (
		<>
			<Link to="/my-ownership" className={unboldedDropdownItemCSS}>My Ownership</Link>
			<Link to="/my-wallet" className={unboldedDropdownItemCSS}>My Wallet</Link>
			{personalInfoClass?.isApprovedToBeCreator && (
				<Link to="/creator/my-content" className={unboldedDropdownItemCSS}>My Content</Link>
			)}
			<Link to="/my-profile" className={unboldedDropdownItemCSS}>My Profile</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className = {unboldedDropdownItemCSS + " w-full text-left"}
					disabled={logoutDisabled}
				>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(ProfileDropdownItems)
