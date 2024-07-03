import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
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
	const [inputWidth, setInputWidth] = useState("100px")
	const spanRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (creatorClass?.channelName) {
			setChannelName(creatorClass.channelName)
		} else if (personalInfoClass?.username) {
			setChannelName(personalInfoClass.username)
		}
	}, [creatorClass?.channelName, personalInfoClass?.username])

	const updateWidth = (text: string) => {
		if (spanRef.current) {
			spanRef.current.textContent = text || " "
			setInputWidth(`${spanRef.current.offsetWidth + 30}px`)
		}
	}

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelName(value)
			updateWidth(value)
		}
	}, [])

	const handleSave = useCallback(async () => {
		await addOrEditChannelName(channelName, setIsLoading)
	}, [addOrEditChannelName, channelName])

	// TODO: Add a character counter

	return (
		<div>
			<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
				Channel Name
			</label>
			<div className="flex items-center space-x-2">
				<div className="relative">
					<span
						ref={spanRef}
						className="invisible absolute whitespace-pre"
						style={{
							padding: "0 2px",
							whiteSpace: "pre"
						}}
					>
						{channelName}
					</span>
					<input
						type="text"
						className={`mt-1 p-2 border rounded text-zinc-950 border-zinc-100 dark:border-zinc-700 
							dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none 
							${channelName.length === maxLength ? "border-red-500 dark:border-red-500" : ""}`}
						value={channelName}
						onChange={handleChange}
						maxLength={maxLength}
						style={{
							minWidth: "150px",
							width: inputWidth,
							paddingRight: "10px",
							boxSizing: "border-box"
						}}
					/>
				</div>
				<Button
					title="Save"
					onClick={handleSave}
					disabled={isLoading}
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					className="text-white rounded-md disabled:opacity-50 h-full"
				/>
			</div>
		</div>
	)
}

export default observer(ChannelName)
