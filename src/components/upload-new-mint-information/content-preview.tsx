import _ from "lodash"
import { useCallback } from "react"
import Button from "../button"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedContentNull: () => void
	children: React.ReactNode
}

export default function ContentPreview(props: Props) {
	const { previewUrl, setPreviewUrl, setSelectedContentNull, children } = props

	const removeContent = useCallback(() => {
		setSelectedContentNull()
		setPreviewUrl(null)
	}, [setPreviewUrl, setSelectedContentNull])

	if (_.isNull(previewUrl)) return null

	return (
		<div className="preview-container">
			<div style={{ position: "relative", display: "inline-block", margin: "5px" }}>
				{ children }
				<Button
					title="Remove"
					colorClass="bg-red-600"
					hoverClass="hover:bg-red-700"
					onClick={removeContent}
					className="text-white font-semibold"
				/>
			</div>
		</div>
	)
}
