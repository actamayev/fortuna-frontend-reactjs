/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import StatusMessage from "../status-message"
import { useCreatorContext } from "../../contexts/creator-context"
import useIsNewVideoLoading from "../../hooks/creator/create-video/is-new-video-loading"
import useCreateVideoOnclick from "../../hooks/creator/create-video/create-video-onclick"
import useConfirmNewVideoDetails from "../../hooks/creator/create-video/confirm-new-video-details"

function UploadNewVideoButton() {
	const creatorClass = useCreatorContext()
	const [error, setError] = useState("")
	const [status, setStatus] = useState("")
	const createVideoOnclick = useCreateVideoOnclick()
	const confirmNewVideoDetails = useConfirmNewVideoDetails()
	const isNewVideoLoading = useIsNewVideoLoading()

	const isImageAndVideoReadyToSubmit = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return !_.isNull(creatorClass.newVideoDetails.selectedImage) && !_.isNull(creatorClass.newVideoDetails.selectedVideo)
	}, [creatorClass, creatorClass?.newVideoDetails.selectedImage, creatorClass?.newVideoDetails.selectedVideo])

	const buttonTitle = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		if (isImageAndVideoReadyToSubmit === false) return "Please upload a video and thumbnail"
		if (confirmNewVideoDetails === false) return "Please finish filling out the fields"
		if (creatorClass.isNewVideoLoading === true) return "Loading..."
		return "Submit"
	}, [isImageAndVideoReadyToSubmit, creatorClass, creatorClass?.isNewVideoLoading, confirmNewVideoDetails])

	return (
		<>
			<Button
				title={buttonTitle}
				disabled={
					isImageAndVideoReadyToSubmit === false || confirmNewVideoDetails === false || isNewVideoLoading
				}
				colorClass="bg-yellow-400"
				hoverClass="hover:bg-yellow-500"
				onClick={() => createVideoOnclick(setError, setStatus)}
			/>

			<StatusMessage status={status} />

			<ErrorMessage error={error} />
		</>
	)
}

export default observer(UploadNewVideoButton)
