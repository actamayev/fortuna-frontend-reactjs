import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { removeLeadingAt } from "../../utils/leading-at-operations"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveCreatorVideosAndDataUseEffect(creatorUsername: AtPrefixedString | undefined): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveCreatorVideosAndData = useCallback(async () => {
		try {
			if (
				_.isUndefined(creatorUsername) ||
				videoClass.isCreatorDataBeingRetrieved === true ||
				!_.isUndefined(videoClass.contextForCreatorData(removeLeadingAt(creatorUsername)))
			) return
			videoClass.setIsCreatorDataBeingRetrieved(true)

			const creatorDataResponse = await fortunaApiClient.videoDataService.getVideosByCreatorUsername(removeLeadingAt(creatorUsername))

			if (!_.isEqual(creatorDataResponse.status, 200) || isNonSuccessResponse(creatorDataResponse.data)) {
				throw Error("Unable to retrieve creator data")
			}
			videoClass.setIsCreatorDataBeingRetrieved(false)
			const creatorDataHeldInClass: CreatorDataHeldInClass = {
				creatorUsername: creatorDataResponse.data.creatorData.creatorUsername,
				channelName: creatorDataResponse.data.creatorData.channelName,
				creatorProfilePictureUrl: creatorDataResponse.data.creatorData.creatorProfilePictureUrl,
				videoData: creatorDataResponse.data.videoData
			}
			videoClass.addRetrievedCreatorData(creatorDataHeldInClass)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.setIsCreatorDataBeingRetrieved(false)
		}
	}, [creatorUsername, videoClass, fortunaApiClient.videoDataService])

	useEffect(() => {
		void retrieveCreatorVideosAndData()
	}, [retrieveCreatorVideosAndData])
}
