import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRemoveCurrentProfilePicture(): (
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		if (_.isNull(creatorClass)) return
		const { profilePictureUrl } = creatorClass
		try {
			creatorClass.setProfilePictureUrl(null)
			setIsDeletingCurrentPicture(false)
			const response = await fortunaApiClient.creatorDataService.removeCurrentProfilePicture()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				return
			}
			notificationsClass.setPositiveNotification("Profile picture removed")
		} catch (error) {
			console.error(error)
			creatorClass.setProfilePictureUrl(profilePictureUrl)  // if fails, reset the url to what it previously was
			notificationsClass.setNegativeNotification("Unable to remove profile picture at this time. Please reload page and try again")
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
