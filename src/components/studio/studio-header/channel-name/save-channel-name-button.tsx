import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../../../hover-outline-component"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface Props {
	handleSaveChannelName: () => Promise<void>
}

function SaveChannelNameButton(props: Props) {
	const { handleSaveChannelName } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block mb-4"
			onClickAction={handleSaveChannelName}
			circlePixelSize="30px"
		>
			<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelNameButton)
