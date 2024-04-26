import SliderDropdownItems from "./slider-dropdown-items"

interface Props {
	isOpen: boolean
}

export default function SliderDropdownContainer (props: Props) {
	const { isOpen } = props

	if (isOpen === false) return null

	return (
		<div
			className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div className="pt-2 pb-1">
				<SliderDropdownItems />
			</div>
		</div>
	)
}
