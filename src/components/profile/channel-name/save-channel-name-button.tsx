import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import { FaRegCircleXmark } from "react-icons/fa6"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useAddOrEditChannelName from "../../../hooks/creator/add-or-edit-channel-name"
import useAssignDefaultChannelName from "../../../hooks/creator/assign-default-channel-name"

interface Props {
	channelName: string
	toggleEditMode: () => void
	setChannelName: React.Dispatch<React.SetStateAction<string>>
}

function SaveChannelNameButton(props: Props) {
	const { channelName, toggleEditMode, setChannelName} = props
	const addOrEditChannelName = useAddOrEditChannelName()
	const defaultSiteTheme = useDefaultSiteTheme()
	const assignDefaultChannelName = useAssignDefaultChannelName()

	const handleSave = useCallback(async () => {
		if (!_.isEmpty(channelName)) await addOrEditChannelName(channelName)
		else assignDefaultChannelName(setChannelName)
		toggleEditMode()
	}, [addOrEditChannelName, assignDefaultChannelName, channelName, setChannelName, toggleEditMode])

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block mb-4"
			onClickAction={handleSave}
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
