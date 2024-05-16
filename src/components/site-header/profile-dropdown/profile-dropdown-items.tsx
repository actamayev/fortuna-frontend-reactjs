/* eslint-disable max-len */
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function ProfileDropdownItems() {
	const personalInfoClass = usePersonalInfoContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)

	const unboldedTopDropdownItemCSS = useMemo(() => "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-50 rounded-t-md", [])
	const unboldedBottomDropdownItemCSS = useMemo(() => "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-50", [])
	const unboldedMiddleDropdownItemCSS = useMemo(() => "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-50 rounded-b-md", [])

	return (
		<>
			<Link to="/my-ownership" className={unboldedTopDropdownItemCSS}>My Ownership</Link>
			<Link to="/my-wallet" className={unboldedBottomDropdownItemCSS}>My Wallet</Link>
			{personalInfoClass?.isApprovedToBeCreator && (
				<Link to="/creator/my-content" className={unboldedBottomDropdownItemCSS}>My Content</Link>
			)}
			<Link to="/my-profile" className={unboldedBottomDropdownItemCSS}>My Profile</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className = {unboldedMiddleDropdownItemCSS + " w-full text-left"}
					disabled={logoutDisabled}
				>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(ProfileDropdownItems)
