import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import ContentPreview from "../../content-preview"
import { useSolanaContext } from "../../../contexts/solana-context"
import ChooseThumbnailToUploadButton from "./choose-thumbnail-to-upload-button"

function ImageUploader() {
	const solanaClass = useSolanaContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("selectedImage", null)
	}, [solanaClass])

	return (
		<>
			<ChooseThumbnailToUploadButton
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
			/>

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
		</>
	)
}

export default observer(ImageUploader)
