import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import useConfirmNewVideoDetails from "./confirm-new-video-details"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useCreateVideoOnclick(): (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const confirmNewVideoDetails = useConfirmNewVideoDetails()

	// eslint-disable-next-line complexity
	return useCallback(async (
		setError: React.Dispatch<React.SetStateAction<string>>,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		if (_.isNull(creatorClass)) return
		try {
			if (
				_.isNull(creatorClass.newVideoDetails.selectedVideo) ||
				_.isNull(creatorClass.newVideoDetails.selectedImage) ||
				confirmNewVideoDetails === false
			) return

			creatorClass.setIsNewVideoLoading(true)

			setStatus("Uploading Video")
			// eslint-disable-next-line max-len
			const uploadVideoResponse = await fortunaApiClient.uploadDataService.uploadVideo(creatorClass.newVideoDetails.selectedVideo)
			if (!_.isEqual(uploadVideoResponse.status, 200) || isNonSuccessResponse(uploadVideoResponse.data)) {
				setError("Error uploading image")
				return
			}

			setStatus("Uploading Thumbnail")
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadThumbnailPicture(
				creatorClass.newVideoDetails.selectedImage, uploadVideoResponse.data.uuid
			)
			if (!_.isEqual(uploadImageResponse.status, 200) || isNonSuccessResponse(uploadImageResponse.data)) {
				setError("Error uploading image")
				return
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { selectedImage, selectedVideo, ...restOfVideoDetails } = creatorClass.newVideoDetails

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const cleanedTierData = restOfVideoDetails.tierData.map(({ isPurchaseTierChecked, ...tierDataToSend }) => tierDataToSend)

			const createVideoObject: CreateVideo = {
				...restOfVideoDetails,
				tierData: cleanedTierData, // use the cleaned tier data without isPurchaseTierChecked
				uuid: uploadVideoResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId,
				uploadedVideoId: uploadVideoResponse.data.uploadedVideoId
			}

			setStatus("Video uploading... you may close this page")
			const createVideoResponse = await fortunaApiClient.creatorDataService.createVideo(createVideoObject)

			if (!_.isEqual(createVideoResponse.status, 200) || isNonSuccessResponse(createVideoResponse.data)) {
				setError("Error uploading video")
				return
			}

			const myContent: MyContent = {
				...restOfVideoDetails,
				videoId: createVideoResponse.data.newVideoId,
				videoListingStatus: "LISTED",
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				numberOfLikes: 0,
				numberOfDislikes: 0,
				createdAt: new Date(),
				totalCreatorProfitInSol: 0,
				totalCreatorProfitInUsd: 0,
				numberOfExclusivePurchasesSoFar: creatorClass.newVideoDetails.isContentExclusive === true ? 0 : null
			}

			creatorClass.addContent(myContent)
			creatorClass.resetNewVideoDetails()
			notificationsClass.setPositiveNotification("Video uploaded")

			navigate("/creator/studio")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to upload video at this time. Please reload page and try again.")
		} finally {
			setStatus("")
			creatorClass.setIsNewVideoLoading(false)
		}
	}, [creatorClass, confirmNewVideoDetails, fortunaApiClient.uploadDataService,
		fortunaApiClient.creatorDataService, notificationsClass, navigate])
}
