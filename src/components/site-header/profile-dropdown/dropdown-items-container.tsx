import ProfileDropdownItems from "./profile-dropdown-items"

interface Props {
	isOpen: boolean
}

export default function DropdownItemsContainer (props: Props) {
	const { isOpen } = props

	if (isOpen === false) return null

	return (
		<div
			className="origin-top-right absolute right-0 mt-1 rounded-md bg-white ring-1 ring-zinc-900 ring-opacity-20 \
				dark:bg-zinc-900 dark:ring-white dark:ring-opacity-20"
			style={{ width: "170px"}}
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<ProfileDropdownItems />
		</div>
	)
}
