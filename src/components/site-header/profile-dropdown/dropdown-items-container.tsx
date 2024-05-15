import ProfileDropdownItems from "./profile-dropdown-items"

interface Props {
	isOpen: boolean
}

export default function DropdownItemsContainer (props: Props) {
	const { isOpen } = props

	if (isOpen === false) return null

	return (
		<div
			className="origin-top-right absolute right-0 mt-1 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5"
			style={{ width: "132px"}}
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div>
				<ProfileDropdownItems />
			</div>
		</div>
	)
}
