import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadNewThumnailPicture(): (
	selectedImage: File | null,
	uuid: string,
	videoId: number
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()
	const notificationsClass = useNotificationsContext()

	const uploadNewThumbnailPicture = useCallback(async (
		selectedImage: File | null,
		uuid: string,
		videoId: number
	) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(creatorClass)) return
			const uploadProfilePictureResponse = await fortunaApiClient.uploadDataService.uploadNewThumbnailPicture(
				selectedImage,
				videoId
			)
			if (!_.isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
				return
			}
			creatorClass.updateVideoProperty(uuid, "imageUrl", uploadProfilePictureResponse.data.imageUploadUrl)
			notificationsClass.setPositiveNotification("New thumbnail uploaded")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to upload new thumbnail at this time. Please reload page and try again")
		}
	}, [creatorClass, fortunaApiClient.uploadDataService, notificationsClass])

	return uploadNewThumbnailPicture
}
