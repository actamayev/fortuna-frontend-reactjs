import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRemoveCurrentChannelBannerPicture(): (
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	const removeCurrentChannelBannerPicture = useCallback(async (
		setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		if (_.isNull(creatorClass)) return
		const { channelBannerUrl } = creatorClass
		try {
			creatorClass.setChannelBannerUrl(null)
			setIsDeletingCurrentPicture(false)
			const response = await fortunaApiClient.creatorDataService.removeCurrentChannelBannerPicture()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				return
			}
		} catch (error) {
			console.error(error)
			creatorClass.setChannelBannerUrl(channelBannerUrl) // if fails, reset the url to what it previously was
			notificationsClass.setNotification("Removing Channel Banner failed. Please refresh and try again")
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])

	return removeCurrentChannelBannerPicture
}
