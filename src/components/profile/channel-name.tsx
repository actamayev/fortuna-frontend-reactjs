import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import Button from "../buttons/button"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useAddOrEditChannelName from "../../hooks/creator/add-or-edit-channel-name"

function ChannelName() {
	const creatorClass = useCreatorContext()
	const personalInfoClass = usePersonalInfoContext()
	const addOrEditChannelName = useAddOrEditChannelName()
	const [isLoading, setIsLoading] = useState(false)
	const [channelName, setChannelName] = useState(creatorClass?.channelName || personalInfoClass?.username || "")
	const maxLength = 60

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length <= maxLength) {
			setChannelName(event.target.value)
		}
	}, [])

	const handleSave = useCallback(async () => {
		await addOrEditChannelName(channelName, setIsLoading)
	}, [addOrEditChannelName, channelName])

	return (
		<div className={"mb-4"}>
			<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">Channel Name</label>
			<div className="flex items-center">
				<input
					type="text"
					className={`mt-1 p-2 w-full border rounded-md text-zinc-950 border-zinc-100 dark:border-zinc-700 \
						dark:text-zinc-200 bg-white dark:bg-zinc-800 ${channelName.length === maxLength ? "border-red-500" : ""}`}
					placeholder=""
					value={channelName}
					onChange={handleChange}
					maxLength={maxLength}
					style={{ width: `${Math.max(100, channelName.length * 10)}px` }}
				/>
				<Button
					title="Save"
					onClick={handleSave}
					disabled={isLoading}
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					className="ml-2 p-2 text-white rounded-md disabled:opacity-50"
				/>
			</div>
			<div className="text-right text-sm text-zinc-600 dark:text-zinc-200">
				{channelName.length}/{maxLength}
			</div>
		</div>
	)
}

export default observer(ChannelName)
