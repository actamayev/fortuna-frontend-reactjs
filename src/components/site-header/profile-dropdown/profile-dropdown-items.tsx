import { useState } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { IoWallet } from "react-icons/io5"
import { GiTwoCoins } from "react-icons/gi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

const useDropdownItemClasses = () => {
	const baseClass = "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-170 flex flex-row"
	return {
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
			<div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700 font-semibold">
				@{personalInfoClass?.username || ""}
			</div>

			<Link to="/my-ownership" className={classes.middle}>
				<GiTwoCoins size={17}/>
				My Ownership
			</Link>
			<Link to="/my-wallet" className={classes.middle}
			>
				<IoWallet size={17}/>

				My Wallet
			</Link>
			{personalInfoClass?.isApprovedToBeCreator && (
				<Link to="/creator/my-content" className={classes.middle}>My Content</Link>
			)}
			<Link to="/my-profile" className={classes.middle}>
				<FaUser size={17}/>
				My Profile
			</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className={`${classes.bottom} w-full text-left flex flex-row`}
					disabled={logoutDisabled}
				>
					<RiLogoutBoxRLine size={17}/>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(ProfileDropdownItems)
