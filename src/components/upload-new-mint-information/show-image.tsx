import _ from "lodash"
import Button from "../button"
import { useCallback } from "react"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedImage: (files: File | null) => void
}

export default function ShowImage(props: Props) {
	const { previewUrl, setPreviewUrl, setSelectedImage } = props

	const removeImage = useCallback(() => {
		setSelectedImage(null)
		setPreviewUrl(null)
	}, [setPreviewUrl, setSelectedImage])

	if (_.isNull(previewUrl)) return null
	return (
		<div className="preview-container">
			<div style={{ position: "relative", display: "inline-block", margin: "5px" }}>
				<img
					src={previewUrl}
					style={{ maxWidth: "35%", height: "auto" }}
				/>
				<Button
					title="Remove"
					colorClass="bg-red-600"
					hoverClass="hover:bg-red-700"
					onClick={removeImage}
					className="text-white font-semibold"
				/>
			</div>
		</div>
	)
}
