import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useAddVideoTag(): (
	videoId: number,
	videoTag: string,
	setVideoTag: React.Dispatch<React.SetStateAction<string>>

) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		videoId: number,
		videoTag: string,
		setVideoTag: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		try {
			const isAbleToAddTag = creatorClass.isAbleToAddTagToVideo(videoId, videoTag)
			if (isAbleToAddTag === false) return

			const addVideoTagResponse = await fortunaApiClient.creatorDataService.addVideoTag(videoTag, videoId)

			if (!_.isEqual(addVideoTagResponse.status, 200) || isErrorResponses(addVideoTagResponse.data)) {
				throw Error("Unable to add tag to video")
			}
			creatorClass.addTagToVideo(videoId, videoTag, addVideoTagResponse.data.videoTagId)
			notificationsClass.setPositiveNotification(`Added #${videoTag}`)
			setVideoTag("")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(`Unable to add #${videoTag} to video.`)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
