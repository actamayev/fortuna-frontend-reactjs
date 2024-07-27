import _ from "lodash"
import { observer } from "mobx-react"
import { FaTrash } from "react-icons/fa"
import { useState, useCallback, ChangeEvent, useRef } from "react"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"

function ImageUploader() {
	const creatorClass = useCreatorContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const removeContent = useCallback(() => {
		setPreviewUrl(null)
		creatorClass.updateNewVideoDetails("selectedImage", null)
	}, [creatorClass])

	const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (_.isNull(files) || _.isEmpty(files)) {
			creatorClass.updateNewVideoDetails("selectedImage", null)
			setPreviewUrl(null)
		} else {
			const file = files[0]
			const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 150MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}

			creatorClass.updateNewVideoDetails("selectedImage", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [setPreviewUrl, creatorClass])

	return (
		<div className="w-1/2 h-auto" style={{ aspectRatio: "16/9" }}>
			<div
				className="relative w-full h-full rounded-xl text-zinc-950 dark:text-zinc-200 flex items-center justify-center
				overflow-hidden bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 hover:dark:bg-zinc-600 cursor-pointer"
				onClick={() => !previewUrl && fileInputRef.current?.click()}
			>
				{!previewUrl ? (
					<div className="cursor-pointer">
						<input
							ref={fileInputRef}
							type="file"
							onChange={handleImageChange}
							accept="image/jpeg, image/png"
							style={{ display: "none" }}
							max={1}
						/>
						<span>Click to upload thumbnail</span>
					</div>
				) : (
					<>
						<img
							src={previewUrl}
							className="w-full h-full object-cover cursor-default"
							alt="Video Thumbnail"
						/>
						<div className="absolute top-2 right-2 font-semibold px-2 py-1 rounded">
							<Button
								titleIcon={<FaTrash />}
								colorClass="bg-red-600"
								hoverClass="hover:bg-red-700"
								onClick={removeContent}
								className="text-zinc-50 font-semibold w-8 h-8 flex items-center justify-center"
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default observer(ImageUploader)
