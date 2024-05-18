/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import StatusMessage from "../status-message"
import { useSolanaContext } from "../../contexts/solana-context"
import useIsNewSplLoading from "../../hooks/solana/mint-spl/is-new-spl-leading"
import useConfirmNewSplDetails from "../../hooks/solana/mint-spl/confirm-new-spl-details"
import useUploadMintInfoOnclick from "../../hooks/solana/mint-spl/upload-mint-info-onclick"

function UploadMintInfoButton() {
	const solanaClass = useSolanaContext()
	const [error, setError] = useState("")
	const [status, setStatus] = useState("")
	const uploadMintInfoOnclick = useUploadMintInfoOnclick()
	const confirmNewSPLDetails = useConfirmNewSplDetails()
	const isNewSplLoading = useIsNewSplLoading()

	const isImageAndVideoReadyToSubmit = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return !_.isNull(solanaClass.newSplDetails.selectedImage) && !_.isNull(solanaClass.newSplDetails.selectedVideo)
	}, [solanaClass, solanaClass?.newSplDetails.selectedImage, solanaClass?.newSplDetails.selectedVideo])

	const buttonTitle = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		if (isImageAndVideoReadyToSubmit === false) return "Please upload a video and thumbnail"
		if (confirmNewSPLDetails === false) return "Please finish filling out the fields"
		if (solanaClass.newSplDetails.creatorOwnershipPercentage < 50) return "Creator ownership percentage must be at least 50%"
		if (solanaClass.newSplDetails.creatorOwnershipPercentage > 90) return "Creator ownership percentage must be at most 90%"
		if (solanaClass.isNewSplLoading === true) return "Loading..."
		return "Submit"
	}, [isImageAndVideoReadyToSubmit, solanaClass, solanaClass?.isNewSplLoading,
		solanaClass?.newSplDetails.creatorOwnershipPercentage, confirmNewSPLDetails])

	const creatorOwnershipPercentage = useMemo(() => {
		if (_.isNull(solanaClass)) return 0
		return solanaClass.newSplDetails.creatorOwnershipPercentage
	}, [solanaClass, solanaClass?.newSplDetails.creatorOwnershipPercentage])

	return (
		<>
			<Button
				title={buttonTitle}
				disabled={
					isImageAndVideoReadyToSubmit === false || confirmNewSPLDetails === false ||
					creatorOwnershipPercentage < 50 || creatorOwnershipPercentage > 90 || isNewSplLoading
				}
				colorClass="bg-yellow-400"
				hoverClass="hover:bg-yellow-500"
				onClick={() => uploadMintInfoOnclick(setError, setStatus)}
			/>

			<StatusMessage status={status} />

			<ErrorMessage error={error} />
		</>
	)
}

export default observer(UploadMintInfoButton)
