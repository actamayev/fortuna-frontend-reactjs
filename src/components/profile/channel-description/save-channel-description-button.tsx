import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useAddOrEditChannelDescription from "../../../hooks/creator/add-or-edit-channel-description"

interface Props {
	channelDescription: string
	toggleEditMode: () => void
}

function SaveChannelDescriptionButton(props: Props) {
	const { channelDescription, toggleEditMode} = props
	const addOrEditChannelDescription = useAddOrEditChannelDescription()
	const defaultSiteTheme = useDefaultSiteTheme()

	const handleSave = useCallback(async () => {
		await addOrEditChannelDescription(channelDescription)
		toggleEditMode()
	}, [addOrEditChannelDescription, channelDescription, toggleEditMode])

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center inline-block mb-4"
			onClickAction={handleSave}
		>
			<FaSave color={defaultSiteTheme === "dark" ? "white" : "black"} />
		</HoverOutlineComponent>
	)
}

export default observer(SaveChannelDescriptionButton)
