import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadChannelBannerPicture(): (
	selectedImage: File | null,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()
	const notificationsClass = useNotificationsContext()

	const uploadChannelBannerPicture = useCallback(async (
		selectedImage: File | null,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(creatorClass)) return
			setIsLoading(true)
			const uploadChannelBannerPictureResponse = await fortunaApiClient.uploadDataService.uploadChannelBannerPicture(selectedImage)
			if (
				!_.isEqual(uploadChannelBannerPictureResponse.status, 200) ||
				isNonSuccessResponse(uploadChannelBannerPictureResponse.data)
			) {
				return
			}
			creatorClass.setChannelBannerUrl(uploadChannelBannerPictureResponse.data.channelBannerPictureUrl)
			notificationsClass.setPositiveNotification("New channel banner uploaded")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to upload channel banner at this time. Please reload page and try again")
		} finally {
			setIsLoading(false)
		}
	}, [creatorClass, fortunaApiClient.uploadDataService, notificationsClass])

	return uploadChannelBannerPicture
}
