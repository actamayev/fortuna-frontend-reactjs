import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import ContentPreview from "../../content-preview"
import { useSolanaContext } from "../../../contexts/solana-context"
import ChooseVideoToUploadButton from "./choose-video-to-upload-button"

function VideoUploader() {
	const solanaClass = useSolanaContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("selectedVideo", null)
	}, [solanaClass])

	return (
		<>
			<ChooseVideoToUploadButton
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
			/>

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
		</>
	)
}

export default observer(VideoUploader)
