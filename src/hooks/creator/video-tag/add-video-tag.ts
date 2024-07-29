import _ from "lodash"
import { useCallback } from "react"
import cleanVideoTag from "../../../utils/clean-video-tag"
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
		const cleanedVideoTag = cleanVideoTag(videoTag)
		try {
			const isAbleToAddTag = creatorClass.isAbleToAddTagToVideo(videoId, cleanedVideoTag)
			if (isAbleToAddTag === false) return

			const addVideoTagResponse = await fortunaApiClient.creatorDataService.addVideoTag(cleanedVideoTag, videoId)

			if (!_.isEqual(addVideoTagResponse.status, 200) || isErrorResponses(addVideoTagResponse.data)) {
				throw Error("Unable to add tag to video")
			}
			creatorClass.addTagToVideo(videoId, cleanedVideoTag, addVideoTagResponse.data.videoTagId)
			notificationsClass.setPositiveNotification(`Added #${cleanedVideoTag}`)
			setVideoTag("")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(`Unable to add #${cleanedVideoTag} to video.`)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
