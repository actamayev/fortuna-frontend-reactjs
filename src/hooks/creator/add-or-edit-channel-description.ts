import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useAddOrEditChannelDescription(): (
	channelDescription: string,
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		channelDescription: string
	): Promise<void> => {
		try {
			if (
				channelDescription.length > 1000 ||
				creatorClass.channelDescription === channelDescription
			) return

			const response = await fortunaApiClient.creatorDataService.addOrEditChannelDescription(channelDescription)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.setChannelDescription(channelDescription)
			notificationsClass.setPositiveNotification("Channel description saved")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to edit channel description at this time. Please reload page and try again.")
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
