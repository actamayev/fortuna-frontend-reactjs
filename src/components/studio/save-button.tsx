import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"

interface Props {
	handleSaveButton: () => Promise<void>
	extraClasses?: string
	customCirclePixelSize?: string
}

export default function SaveButton(props: Props) {
	const { handleSaveButton, extraClasses = "", customCirclePixelSize = "30px" } = props

	return (
		<HoverOutlineComponent
			classes={`relative flex items-center justify-center inline-block text-black dark:text-white ${extraClasses}`}
			onClickAction={handleSaveButton}
			circlePixelSize={customCirclePixelSize}
		>
			<FaSave />
		</HoverOutlineComponent>
	)
}
