import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	toggleEditMode: () => void
}

function EditPencilButton(props: Props) {
	const { toggleEditMode } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			onClickAction={toggleEditMode}
			classes="flex items-center justify-center mb-1"
			circlePixelSize="33px"
		>
			<RiPencilFill color={defaultSiteTheme === "dark" ? "white" : "black"} size={17} />
		</HoverOutlineComponent>
	)
}

export default observer(EditPencilButton)
