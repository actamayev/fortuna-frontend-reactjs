import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	cancelEditAction: () => void
	extraClasses?: string
	customCirclePixelSize?: string
}

function CancelEditingButton(props: Props) {
	const { cancelEditAction, extraClasses = "", customCirclePixelSize = "30px" } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes={`relative flex items-center justify-center inline-block ${extraClasses}`}
			onClickAction={cancelEditAction}
			circlePixelSize={customCirclePixelSize}
		>
			<FaTimes color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(CancelEditingButton)
