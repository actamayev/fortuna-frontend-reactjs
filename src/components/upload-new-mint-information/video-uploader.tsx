import _ from "lodash"
import { observer } from "mobx-react"
import { useState, ChangeEvent, useRef, useCallback } from "react"
import Button from "../button"
import ContentPreview from "./content-preview"
import { useSolanaContext } from "../../contexts/solana-context"

function VideoUploader() {
	const solanaClass = useSolanaContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleVideoChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		if (_.isNull(solanaClass)) return
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			const maxFileSize = 100 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 10MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}

			solanaClass.updateNewSplDetails("selectedVideo", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			solanaClass.updateNewSplDetails("selectedVideo", null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = "" // Reset the input after handling
	}, [solanaClass])

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("selectedVideo", null)
	}, [solanaClass])

	if (_.isNull(solanaClass)) return null

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
			{_.isNull(previewUrl) && (
				<Button
					title="Select a Video"
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					onClick={() => fileInputRef.current?.click()}
					className="text-white font-semibold"
				/>
			)}

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrlNull={() => setPreviewUrl(null)}
				setSelectedContentNull={setSelectedContentNull}
			>
				<video
					src={previewUrl || ""}
					controls
					className="max-w-[100%] h-auto rounded-lg"
				/>
			</ContentPreview>
		</div>
	)
}

export default observer(VideoUploader)
