import ProfileDropdownItems from "./profile-dropdown-items"

interface Props {
	isOpen: boolean
}

export default function DropdownItemsContainer (props: Props) {
	const { isOpen } = props

	if (isOpen === false) return null

	return (
		<div
			className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div className="py-1">
				<ProfileDropdownItems />
			</div>
		</div>
	)
}
