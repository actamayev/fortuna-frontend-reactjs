import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	toggleEditAndAssignDefaultValue: () => void
	extraClasses?: string
}

function CancelEditingButton(props: Props) {
	const { toggleEditAndAssignDefaultValue, extraClasses = "" } = props

	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes={`relative flex items-center justify-center inline-block ${extraClasses}`}
			onClickAction={toggleEditAndAssignDefaultValue}
			circlePixelSize="30px"
		>
			<FaTimes color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(CancelEditingButton)
