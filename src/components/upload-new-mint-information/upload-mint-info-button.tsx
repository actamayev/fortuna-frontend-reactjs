import _ from "lodash"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import StatusMessage from "../status-message"
import { useSolanaContext } from "../../contexts/solana-context"
import confirmNewSPLDetails from "../../utils/confirm-new-spl-details"
import useUploadMintInfoOnclick from "../../hooks/solana/upload-mint-info-onclick"

function UploadMintInfoButton() {
	const solanaClass = useSolanaContext()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [status, setStatus] = useState("")
	const uploadMintInfoOnclick = useUploadMintInfoOnclick()

	const isImageAndVideoReadyToSubmit = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return !_.isNull(solanaClass.newSplDetails.selectedImage) && !_.isNull(solanaClass.newSplDetails.selectedVideo)
	}, [solanaClass])

	const buttonTitle = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		if (isImageAndVideoReadyToSubmit === false) return "Please upload an image (thumbnail) and video"
		else if (confirmNewSPLDetails(solanaClass.newSplDetails) === false) return "Please finish filling out the fields"
		else if (solanaClass.newSplDetails.creatorOwnershipPercentage < 50) return "Creator ownership percentage must be at least 50%"
		else if (solanaClass.newSplDetails.creatorOwnershipPercentage > 90) return "Creator ownership percentage must be at most 90%"
		return "Submit"
	}, [isImageAndVideoReadyToSubmit, solanaClass])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<Button
				title={buttonTitle}
				disabled={
					isImageAndVideoReadyToSubmit === false || confirmNewSPLDetails(solanaClass.newSplDetails) === false ||
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
