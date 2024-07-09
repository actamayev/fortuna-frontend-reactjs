import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useCreatorContext } from "../../contexts/creator-context"

function VideoDescriptionInput() {
	const creatorClass = useCreatorContext()
	const maxLength = 5000
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const description = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.newVideoDetails.description
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.description])

	useEffect(() => {
		if (!textAreaRef.current) return
		textAreaRef.current.style.height = "auto"
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
	}, [description])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoDetails("description", event.target.value)
	}, [creatorClass])

	return (
		<>
			<div>
				<label className="text-sm text-zinc-600 dark:text-zinc-200 mt-2 ml-0.5 font-semibold">
				Video Description
				</label>
				<textarea
					ref={textAreaRef}
					className={
						`p-2 border rounded text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none w-full
					${description.length === maxLength ? "border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
					value={description}
					onChange={updateNewVideoDetails}
					maxLength={maxLength}
					rows={2}
					placeholder="Charlie bit my finger really hard"
				/>
			</div>
			<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
				{description.length}/{maxLength}
			</span>
		</>
	)
}

export default observer(VideoDescriptionInput)
