import _ from "lodash"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import { FaRegCircleXmark } from "react-icons/fa6"
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
		>
			{_.isEmpty(channelName) ? (
				<FaRegCircleXmark color={defaultSiteTheme === "dark" ? "white" : "black"} />
			) : (
				<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
			)}
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelNameButton)
