import { FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"

interface Props {
	cancelEditAction: () => void
	extraClasses?: string
	customCirclePixelSize?: string
}

export default function CancelEditingButton(props: Props) {
	const { cancelEditAction, extraClasses = "", customCirclePixelSize = "30px" } = props

	return (
		<HoverOutlineComponent
			classes={`relative flex items-center justify-center inline-block text-black dark:text-white ${extraClasses}`}
			onClickAction={cancelEditAction}
			circlePixelSize={customCirclePixelSize}
		>
			<FaTimes />
		</HoverOutlineComponent>
	)
}
