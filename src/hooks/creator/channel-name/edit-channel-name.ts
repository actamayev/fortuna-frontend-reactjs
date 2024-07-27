import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useEditChannelName(): (channelName: string) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (channelName: string): Promise<void> => {
		try {
			if (
				channelName.length > 60 ||
				creatorClass.channelName === channelName ||
				(_.isEmpty(creatorClass.channelName) && (
					personalInfoClass.username && personalInfoClass.username === channelName
				))
			) return

			const response = await fortunaApiClient.creatorDataService.editChannelName(channelName)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.setChannelName(channelName)
			notificationsClass.setPositiveNotification("Channel name saved")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to edit channel name at this time. Please reload page and try again.")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass.channelName, fortunaApiClient.creatorDataService, notificationsClass, personalInfoClass.username])
}
