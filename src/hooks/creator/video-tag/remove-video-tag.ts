import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useRemoveVideoTag(): (
	videoTag: string,
	videoTagId: number,
	videoId: number
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		videoTag: string,
		videoTagId: number,
		videoId: number
	): Promise<void> => {
		try {
			const response = await fortunaApiClient.creatorDataService.deleteVideoTag(videoTagId, videoId)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				throw Error("Unable to add tag to video")
			}
			creatorClass.removeTagFromVideo(videoId, videoTagId)
			notificationsClass.setPositiveNotification(`Removed #${videoTag}`)
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(`Unable to add #${videoTag} to video.`)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
