/* eslint-disable max-len */
import { useState } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

const useDropdownItemClasses = () => {
	const baseClass = "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-50"
	return {
		top: `${baseClass} rounded-t-md`,
		bottom: `${baseClass} rounded-b-md`,
		middle: baseClass
	}
}

function ProfileDropdownItems() {
	const personalInfoClass = usePersonalInfoContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)
	const classes = useDropdownItemClasses()

	return (
		<>
			<Link to="/my-ownership" className={classes.top}>My Ownership</Link>
			<Link to="/my-wallet" className={classes.middle}>My Wallet</Link>
			{personalInfoClass?.isApprovedToBeCreator && (
				<Link to="/creator/my-content" className={classes.middle}>My Content</Link>
			)}
			<Link to="/my-profile" className={classes.middle}>My Profile</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className={`${classes.bottom} w-full text-left`}
					disabled={logoutDisabled}
				>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(ProfileDropdownItems)
