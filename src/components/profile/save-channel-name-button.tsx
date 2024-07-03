import _ from "lodash"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import { useCallback, useState } from "react"
import Button from "../buttons/button"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useAddOrEditChannelName from "../../hooks/creator/add-or-edit-channel-name"

interface Props {
	channelName: string
}

function SaveChannelNameButton(props: Props) {
	const { channelName } = props
	const creatorClass = useCreatorContext()
	const personalInfoClass = usePersonalInfoContext()
	const [isLoading, setIsLoading] = useState(false)
	const addOrEditChannelName = useAddOrEditChannelName()

	const handleSave = useCallback(async () => {
		await addOrEditChannelName(channelName, setIsLoading)
	}, [addOrEditChannelName, channelName])

	if (creatorClass?.channelName && creatorClass.channelName === channelName) return null
	else if (
		_.isEmpty(creatorClass?.channelName) &&
		(personalInfoClass?.username && personalInfoClass.username === channelName)
	) return null

	return (
		<div className="flex items-center h-full">
			<Button
				titleIcon={<FaSave size={20} />}
				onClick={handleSave}
				disabled={isLoading}
				colorClass="bg-emerald-500"
				hoverClass="hover:bg-emerald-600"
				className="text-white rounded-md disabled:opacity-50 h-full flex items-center justify-center mb-4"
				style={{
					height: "38px"
				}}
			/>
		</div>
	)
}

export default observer(SaveChannelNameButton)
