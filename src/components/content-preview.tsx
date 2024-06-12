import _ from "lodash"
import { useCallback } from "react"
import { FaTrash } from "react-icons/fa"
import Button from "./buttons/button"

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
		<div className="preview-container flex items-center">
			{children}
			<Button
				titleIcon={<FaTrash />}
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				onClick={removeContent}
				className="text-zinc-50 font-semibold w-8 h-8 flex items-center justify-center"
			/>
		</div>
	)
}
