import _ from "lodash"
import { useCallback } from "react"
import Button from "./button"

interface Props {
	previewUrl: string | null
	setPreviewUrlNull: () => void
	setSelectedContentNull: () => void
	children: React.ReactNode
}

export default function ContentPreview(props: Props) {
	const { previewUrl, setPreviewUrlNull, setSelectedContentNull, children } = props

	const removeContent = useCallback(() => {
		setSelectedContentNull()
		setPreviewUrlNull()
	}, [setPreviewUrlNull, setSelectedContentNull])

	if (_.isNull(previewUrl)) return null

	return (
		<div className="preview-container">
			{ children }
			<Button
				title="Remove"
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				onClick={removeContent}
				className="text-zinc-50 font-semibold"
			/>
		</div>
	)
}
