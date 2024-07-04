import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import useAddOrEditChannelName from "../../hooks/creator/add-or-edit-channel-name"

interface Props {
	channelName: string
	toggleEditMode: () => void
}

function SaveChannelNameButton(props: Props) {
	const { channelName, toggleEditMode } = props
	const addOrEditChannelName = useAddOrEditChannelName()
	const defaultSiteTheme = useDefaultSiteTheme()

	const handleSave = useCallback(async () => {
		await addOrEditChannelName(channelName)
		toggleEditMode()
	}, [addOrEditChannelName, channelName, toggleEditMode])

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block mb-4"
			onClickAction={handleSave}
		>
			<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelNameButton)
