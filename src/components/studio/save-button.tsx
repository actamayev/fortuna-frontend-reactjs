import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	handleSaveButton: () => Promise<void>
	extraClasses?: string
	customCirclePixelSize?: string
}

function SaveButton(props: Props) {
	const { handleSaveButton, extraClasses = "", customCirclePixelSize = "30px" } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes={`relative flex items-center justify-center inline-block ${extraClasses}`}
			onClickAction={handleSaveButton}
			circlePixelSize={customCirclePixelSize}
		>
			<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(SaveButton)
