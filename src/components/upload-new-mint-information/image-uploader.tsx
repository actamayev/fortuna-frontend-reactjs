import _ from "lodash"
import { observer } from "mobx-react"
import { useState, ChangeEvent, useRef, useCallback } from "react"
import Button from "../button"
import ContentPreview from "../content-preview"
import { useSolanaContext } from "../../contexts/solana-context"

function ImageUploader() {
	const solanaClass = useSolanaContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		if (_.isNull(solanaClass)) return
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			solanaClass.updateNewSplDetails("selectedImage", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			solanaClass.updateNewSplDetails("selectedImage", null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [solanaClass])

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("selectedImage", null)
	}, [solanaClass])

	if (_.isNull(solanaClass)) return null

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
			{_.isNull(previewUrl) && (
				<Button
					title="Select a Thumbnail"
					colorClass="bg-sky-200"
					hoverClass="hover:bg-sky-300"
					onClick={() => fileInputRef.current?.click()}
					className="font-semibold"
				/>
			)}

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrlNull={() => setPreviewUrl(null)}
				setSelectedContentNull={setSelectedContentNull}
			>
				<img
					src={previewUrl || ""}
					className="max-w-[35%] h-auto rounded-lg"
				/>
			</ContentPreview>
		</div>
	)
}

export default observer(ImageUploader)
