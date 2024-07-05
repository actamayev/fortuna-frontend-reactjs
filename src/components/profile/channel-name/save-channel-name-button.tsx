import _ from "lodash"
import { observer } from "mobx-react"
import { FaSave, FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	channelName: string
	handleSaveChannelName: () => Promise<void>
}

function SaveChannelNameButton(props: Props) {
	const { channelName, handleSaveChannelName } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block"
			onClickAction={handleSaveChannelName}
			circlePixelSize="33px"
		>
			{_.isEmpty(channelName) ? (
				<FaTimes color={defaultSiteTheme === "dark" ? "white" : "black"} />
			) : (
				<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
			)}
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelNameButton)
