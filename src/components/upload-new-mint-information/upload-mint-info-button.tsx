import _ from "lodash"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import StatusMessage from "../status-message"
import { useSolanaContext } from "../../contexts/solana-context"
import useConfirmNewSplDetails from "../../hooks/solana/mint-spl/confirm-new-spl-details"
import useUploadMintInfoOnclick from "../../hooks/solana/mint-spl/upload-mint-info-onclick"

function UploadMintInfoButton() {
	const solanaClass = useSolanaContext()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [status, setStatus] = useState("")
	const uploadMintInfoOnclick = useUploadMintInfoOnclick()
	const confirmNewSPLDetails = useConfirmNewSplDetails()

	const isImageAndVideoReadyToSubmit = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return !_.isNull(solanaClass.newSplDetails.selectedImage) && !_.isNull(solanaClass.newSplDetails.selectedVideo)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.selectedImage, solanaClass?.newSplDetails.selectedVideo])

	const buttonTitle = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		if (isImageAndVideoReadyToSubmit === false) return "Please upload an image (thumbnail) and video"
		if (confirmNewSPLDetails === false) return "Please finish filling out the fields"
		if (solanaClass.newSplDetails.creatorOwnershipPercentage < 50) return "Creator ownership percentage must be at least 50%"
		if (solanaClass.newSplDetails.creatorOwnershipPercentage > 90) return "Creator ownership percentage must be at most 90%"
		if (loading === true) return "Loading..."
		return "Submit"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isImageAndVideoReadyToSubmit, loading, solanaClass, solanaClass?.newSplDetails.creatorOwnershipPercentage, confirmNewSPLDetails])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<Button
				title={buttonTitle}
				disabled={
					isImageAndVideoReadyToSubmit === false || confirmNewSPLDetails === false ||
					solanaClass.newSplDetails.creatorOwnershipPercentage < 50 ||
					solanaClass.newSplDetails.creatorOwnershipPercentage > 90 || loading
				}
				colorClass="bg-yellow-400"
				hoverClass="hover:bg-yellow-500"
				onClick={() => uploadMintInfoOnclick(setError, setLoading, setStatus)}
			/>

			<StatusMessage status={status} />

			<ErrorMessage error={error} />
		</>
	)
}

export default observer(UploadMintInfoButton)
