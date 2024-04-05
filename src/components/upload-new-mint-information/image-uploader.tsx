import _ from "lodash"
import { useState, ChangeEvent, useRef, useCallback } from "react"
import Button from "../button"
import ShowImage from "./show-image"

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

		if (_.isNull(fileInputRef.current))  return
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
			<Button
				title="Choose an Image"
				colorClass="bg-violet-500"
				hoverClass="hover:bg-violet-600"
				onClick={() => fileInputRef.current?.click()}
				className="text-white font-semibold"
				disabled={!_.isNull(selectedImage)}
			/>

			<ShowImage
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
				setSelectedImage={setSelectedImage}
			/>
		</div>
	)
}

