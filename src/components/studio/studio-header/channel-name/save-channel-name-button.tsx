import _ from "lodash"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../../../hover-outline-component"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface Props {
	channelName: string
	handleSaveChannelName: () => Promise<void>
}

function SaveChannelNameButton(props: Props) {
	const { channelName, handleSaveChannelName } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	if (_.isEmpty(channelName)) return null

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
