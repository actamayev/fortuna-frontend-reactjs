import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useEditVideoName(): (
	videoUUID: string,
	videoName: string,
	setVideoName: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		videoUUID: string,
		videoName: string,
		setVideoName: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		if (_.isNull(creatorClass) || videoName.length > 100) return

		const existingVideo = creatorClass.contextForMyContent(videoUUID)
		if (_.isUndefined(existingVideo) || existingVideo.videoName === videoName) return

		try {
			const response = await fortunaApiClient.creatorDataService.editVideoName(videoName, videoUUID)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				return
			}

			creatorClass.updateVideoProperty(videoUUID, "videoName", videoName)
			notificationsClass.setPositiveNotification("Video name updated")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to edit video name at this time. Please reload page and try again.")
			setVideoName(existingVideo.videoName)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
