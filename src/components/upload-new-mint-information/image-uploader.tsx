import _ from "lodash"
import { useState, ChangeEvent, useRef, useCallback } from "react"
import Button from "../button"
import ContentPreview from "./content-preview"

interface Props {
	selectedImage: File | null
	setSelectedImage: (files: File | null) => void
}

export default function ImageUploader(props: Props) {
	const { selectedImage, setSelectedImage } = props
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			setSelectedImage(file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			setSelectedImage(null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [setSelectedImage])

	return (
		<div className="mb-2">
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/*"
				style={{ display: "none" }}
				max={1}
			/>
			{selectedImage ? (<></>) : (
				<Button
					title="Choose a Thumbnail"
					colorClass="bg-sky-500"
					hoverClass="hover:bg-sky-600"
					onClick={() => fileInputRef.current?.click()}
					className="text-white font-semibold"
					disabled={!_.isNull(selectedImage)}
				/>
			)}

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
				setSelectedContent={setSelectedImage}
			>
				<img
					src={previewUrl || ""}
					style={{ maxWidth: "35%", height: "auto" }}
				/>
			</ContentPreview>
		</div>
	)
}

