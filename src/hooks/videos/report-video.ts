import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useReportVideo(): (
	video: UrlExtendedSingleVideoData,
	reportMessage: string,
	toggleModalOpen: () => void
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		video: UrlExtendedSingleVideoData,
		reportMessage: string,
		toggleModalOpen
	) => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				video.isUserAbleToAccessVideo === false
			) return
			const likeResponse = await fortunaApiClient.videoDataService.reportVideo(
				video.videoId, !_.isEmpty(reportMessage) ? reportMessage : undefined
			)

			if (!_.isEqual(likeResponse.status, 200) || isNonSuccessResponse(likeResponse.data)) {
				throw new Error("Report Video failed")
			}
			toggleModalOpen()
			notificationsClass.setPositiveNotification("Video reported")
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "User has already reported this video") {
						notificationsClass.setNeutralNotification("You have already reported this video")
						toggleModalOpen()
						return
					}
				}
			}
			notificationsClass.setNegativeNotification("Unable to report video at this time. Please reload page and try again.")
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.videoDataService, notificationsClass])
}
