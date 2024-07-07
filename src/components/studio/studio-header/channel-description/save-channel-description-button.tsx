import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../../../hover-outline-component"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface Props {
	handleSaveChannelDescription: () => Promise<void>
}

function SaveChannelDescriptionButton(props: Props) {
	const { handleSaveChannelDescription} = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block mb-3"
			onClickAction={handleSaveChannelDescription}
			circlePixelSize="33px"
		>
			<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelDescriptionButton)
