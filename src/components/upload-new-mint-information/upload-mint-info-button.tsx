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

	const isImageAndVideoReadyToSubmit = useMemo(() => {
		return !_.isNull(selectedImage) && !_.isNull(selectedVideo)
	}, [selectedImage, selectedVideo])

	const buttonTitle = useMemo(() => {
		if (isImageAndVideoReadyToSubmit === false) return "Please upload an image (thumbnail) and video"
		else if (confirmNewSPLDetails(newSplDetails) === false) return "Please finish filling out the fields"
		else if (newSplDetails.creatorOwnershipPercentage < 50) return "Creator ownership percentage must be at least 50%"
		else if (newSplDetails.creatorOwnershipPercentage > 90) return "Creator ownership percentage must be at most 90%"
		return "Submit"
	}, [isImageAndVideoReadyToSubmit, newSplDetails])

	return (
		<>
			<Button
				title={buttonTitle}
				disabled={
					isImageAndVideoReadyToSubmit === false || confirmNewSPLDetails(newSplDetails) === false ||
					newSplDetails.creatorOwnershipPercentage < 50 || newSplDetails.creatorOwnershipPercentage > 90 || loading
				}
				colorClass="bg-yellow-400"
				hoverClass="hover:bg-yellow-500"
				onClick={() => uploadMintInfoOnclick(newSplDetails, selectedImage, selectedVideo, setError, setLoading, setStatus)}
			/>

			<StatusMessage status={status} />

			<ErrorMessage error={error} />
		</>
	)
}
