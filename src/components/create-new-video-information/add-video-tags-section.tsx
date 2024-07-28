import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useCreatorContext } from "../../contexts/creator-context"
import SingleVideoTagInCreateContent from "./single-video-tag-in-create-content"

function AddVideoTagsSection() {
	const creatorClass = useCreatorContext()
	const [videoTag, setVideoTag] = useState("")
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const maxLength = 12

	useEffect(() => {
		if (!textAreaRef.current) return
		textAreaRef.current.style.height = "auto"
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
	}, [videoTag])

	const activeVideoTags = useMemo(() => {
		return creatorClass.newVideoDetails.videoTags
	}, [creatorClass.newVideoDetails.videoTags])

	const addVideoTagCallback = useCallback(() => {
		if (videoTag.trim() === "") return
		creatorClass.addVideoTag(videoTag.trim())
		setVideoTag("")
	}, [creatorClass, videoTag])

	const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key !== "Enter" && e.key !== ",") return
		e.preventDefault()
		addVideoTagCallback()
	}, [addVideoTagCallback])

	const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
		const sanitizedValue = value.replace(/[#?&/@]/g, "")
		setVideoTag(sanitizedValue)
	}, [])

	return (
		<div>
			<label className="text-sm text-zinc-600 dark:text-zinc-200 ml-0.5 font-semibold">
				Video Tags
			</label>
			<div className="p-2 border rounded text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none w-full">
				{activeVideoTags.map(tag => (
					<SingleVideoTagInCreateContent
						key={tag}
						videoTag={tag}
					/>
				))}
				<textarea
					ref={textAreaRef}
					className={
						`p-2 border rounded text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none w-full
				${activeVideoTags.length === maxLength ? "border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
					value={videoTag}
					onChange={handleChange}
					onKeyDown={handleKeyPress}
					rows={1}
					placeholder="Add a tag..."
				/>
				<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
					{activeVideoTags.length}/{maxLength}
				</span>
			</div>
		</div>
	)
}

export default observer(AddVideoTagsSection)
