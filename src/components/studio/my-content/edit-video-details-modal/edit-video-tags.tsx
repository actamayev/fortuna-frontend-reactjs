import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import FormGroup from "../../../form-group"
import cleanVideoTag from "../../../../utils/clean-video-tag"
import SingleVideoTagInStudio from "./single-video-tag-in-studio"
import useAddVideoTag from "../../../../hooks/creator/video-tag/add-video-tag"

interface Props {
	content: MyContent
}

function EditVideoTags(props: Props) {
	const { content } = props
	const [videoTag, setVideoTag] = useState("")
	const maxLengthActiveVideoTags = 12
	const maxTagLength = 50
	const addVideoTag = useAddVideoTag()

	const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter" && e.key !== ",") return
		e.preventDefault()
		if (videoTag.trim() === "") return
		addVideoTag(content.videoId, videoTag, setVideoTag)
	}, [addVideoTag, content.videoId, videoTag])

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const limitedValue = cleanVideoTag(value)
		setVideoTag(limitedValue)
	}, [])

	return (
		<div className="mt-1">
			<label className="text-sm text-zinc-600 dark:text-zinc-200 ml-0.5 font-semibold">
				Video Tags
			</label>
			<div
				className="p-2 text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none w-full
				border rounded-md border-zinc-200 dark:border-zinc-700"
			>
				{content.videoTags.map(tag => (
					<SingleVideoTagInStudio
						key={tag.videoTagId}
						tag={tag}
						videoId={content.videoId}
					/>
				))}
				<FormGroup
					type="text"
					placeholder="Add a tag..."
					onChange={handleChange}
					onKeyDown={handleKeyPress}
					value={videoTag}
					maxLength={maxTagLength}
					className="mb-3"
				/>
				<div className="flex flex-col space-y-1">
					<div className="flex flex-row items-center">
						<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
							{videoTag.length}/{maxTagLength}
						</span>
					</div>
					<div className="flex flex-row items-center">
						<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
							Tag Limit {content.videoTags.length}/{maxLengthActiveVideoTags}
							{(content.videoTags.length === maxLengthActiveVideoTags) && (
								<span className="text-xs text-red-500 ml-1">Unable to add more tags</span>
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(EditVideoTags)
