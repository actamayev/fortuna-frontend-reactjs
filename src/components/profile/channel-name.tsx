import { observer } from "mobx-react"
import { useState, useCallback, useEffect } from "react"
import Button from "../buttons/button"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useAddOrEditChannelName from "../../hooks/creator/add-or-edit-channel-name"

function ChannelName() {
	const creatorClass = useCreatorContext()
	const personalInfoClass = usePersonalInfoContext()
	const addOrEditChannelName = useAddOrEditChannelName()
	const [isLoading, setIsLoading] = useState(false)
	const [channelName, setChannelName] = useState("")
	const maxLength = 60

	useEffect(() => {
		if (creatorClass?.channelName) {
			setChannelName(creatorClass.channelName)
		} else if (personalInfoClass?.username) {
			setChannelName(personalInfoClass.username)
		}
	}, [creatorClass?.channelName, personalInfoClass?.username])

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length <= maxLength) {
			setChannelName(event.target.value)
		}
	}, [])

	const handleSave = useCallback(async () => {
		await addOrEditChannelName(channelName, setIsLoading)
	}, [addOrEditChannelName, channelName])

	return (
		<div>
			<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
				Channel Name
			</label>
			<div className="flex flex-row">
				<div>
					<input
						type="text"
						className={`mt-1 p-2 border rounded-md text-zinc-950 border-zinc-100 dark:border-zinc-700 
							dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none
							${channelName.length === maxLength ? "border-red-500 dark:border-red-500" : ""}`}
						value={channelName}
						onChange={handleChange}
						maxLength={maxLength}
					/>
					{/* <div className="absolute bottom-1 right-2 text-sm text-zinc-600 dark:text-zinc-200">
						{channelName.length}/{maxLength}
					</div> */}
				</div>
				<Button
					title="Save"
					onClick={handleSave}
					disabled={isLoading}
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					className="text-white rounded-md disabled:opacity-50 h-10 ml-2 justify-center"
				/>
			</div>
		</div>
	)
}

export default observer(ChannelName)
