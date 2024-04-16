import _ from "lodash"
import { useState, ChangeEvent, useRef, useCallback } from "react"
import Button from "../button"
import ContentPreview from "./content-preview"

interface Props {
	selectedVideo: File | null
	setSelectedVideo: (files: File | null) => void
}

export default function VideoUploader(props: Props) {
	const { selectedVideo, setSelectedVideo } = props
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleVideoChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 10MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}

			setSelectedVideo(file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			setSelectedVideo(null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = "" // Reset the input after handling
	}, [setSelectedVideo])

	return (
		<div className="mb-2">
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleVideoChange}
				accept="video/*"
				style={{ display: "none" }}
				max={1}
			/>
			{selectedVideo ? (<></>) : (
				<Button
					title="Choose an Video"
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					onClick={() => fileInputRef.current?.click()}
					className="text-white font-semibold"
					disabled={!_.isNull(selectedVideo)}
				/>
			)}

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
				setSelectedContent={setSelectedVideo}
			>
				<video
					src={previewUrl || ""}
					style={{ maxWidth: "100%", height: "auto" }}
					controls
				/>
			</ContentPreview>
		</div>
	)
}
