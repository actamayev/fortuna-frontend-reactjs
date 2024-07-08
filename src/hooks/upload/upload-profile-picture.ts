import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadProfilePicture(): (selectedImage: File | null) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()
	const notificationsClass = useNotificationsContext()

	const uploadProfilePicture = useCallback(async (selectedImage: File | null) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(creatorClass)) return
			const uploadProfilePictureResponse = await fortunaApiClient.uploadDataService.uploadProfilePicture(selectedImage)
			if (!_.isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
				return
			}
			creatorClass.setProfilePictureUrl(uploadProfilePictureResponse.data.profilePictureUrl)
			notificationsClass.setPositiveNotification("Successfully uploaded new profile picture")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to upload profile picture at this time. Please reload page and try again")
		}
	}, [creatorClass, fortunaApiClient.uploadDataService, notificationsClass])

	return uploadProfilePicture
}
