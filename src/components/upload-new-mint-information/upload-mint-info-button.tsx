import _ from "lodash"
import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import StatusMessage from "../status-message"
import confirmNewSPLDetails from "../../utils/confirm-new-spl-details"
import useUploadMintInfoOnclick from "../../hooks/solana/upload-mint-info-onclick"

interface Props {
	selectedImage: File | null
	selectedVideo: File | null
	newSplDetails: NewSPLDetails
}

export default function UploadMintInfoButton(props: Props) {
	const { newSplDetails, selectedImage, selectedVideo } = props
	const [loading, setLoading] = useState(false)
	const uploadMintInfoOnclick = useUploadMintInfoOnclick()
	const [error, setError] = useState("")
	const [status, setStatus] = useState("")

	const isReadyToSubmit = useMemo(() => {
		return confirmNewSPLDetails(newSplDetails) && !_.isNull(selectedImage) && !_.isNull(selectedVideo)
	}, [newSplDetails, selectedImage, selectedVideo])

	return (
		<>
			<Button
				title={isReadyToSubmit ? "Submit" : "Please finish fields and image"}
				disabled={!isReadyToSubmit || loading}
				colorClass="bg-yellow-400"
				hoverClass="hover:bg-yellow-500"
				onClick={() => uploadMintInfoOnclick(newSplDetails, selectedImage, selectedVideo, setError, setLoading, setStatus)}
			/>

			<StatusMessage status={status} />

			<ErrorMessage error={error} />
		</>
	)
}
