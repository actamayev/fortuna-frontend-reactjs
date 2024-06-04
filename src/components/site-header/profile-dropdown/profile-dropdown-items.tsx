import { useState } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { IoWallet } from "react-icons/io5"
import { GiTwoCoins } from "react-icons/gi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { BsFillCollectionPlayFill } from "react-icons/bs"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

const useDropdownItemClasses = () => {
	const baseClass = "px-4 py-2 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-800"
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
		<div className="text-base text-zinc-950 dark:text-zinc-200">
			<div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700 font-medium">
				@{personalInfoClass?.username || ""}
			</div>

			<Link to="/my-ownership" className={classes.middle}>
				<GiTwoCoins className="mr-2" size={17} />
				My Ownership
			</Link>
			<Link to="/my-wallet" className={classes.middle}>
				<IoWallet className="mr-2" size={17} />
				My Wallet
			</Link>
			{personalInfoClass?.isApprovedToBeCreator && (
				<Link to="/creator/my-content" className={classes.middle}>
					<BsFillCollectionPlayFill className="mr-2" size={17} />
					My Content
				</Link>
			)}
			<Link to="/my-profile" className={classes.middle}>
				<FaUser className="mr-2" size={17} />
				My Profile
			</Link>
			<div className="block">
				<button
					onClick={handleLogout}
					className={`${classes.bottom} w-full text-left`}
					disabled={logoutDisabled}
				>
					<RiLogoutBoxRLine className="mr-2" size={17} />
					Sign out
				</button>
			</div>
		</div>
	)
}

export default observer(ProfileDropdownItems)
