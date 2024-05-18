import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveCreatorVideosAndDataUseEffect(creatorUsername: string | undefined): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveCreatorVideosAndData = useCallback(async () => {
		try {
			if (
				_.isUndefined(creatorUsername) ||
				videoClass.isCreatorDataBeingRetrieved === true ||
				!_.isUndefined(videoClass.contextForCreatorData(creatorUsername))
			) return
			videoClass.setIsCreatorDataBeingRetrieved(true)

			const creatorDataResponse = await fortunaApiClient.videoDataService.getVideosByCreatorUsername(creatorUsername)

			if (!_.isEqual(creatorDataResponse.status, 200) || isNonSuccessResponse(creatorDataResponse.data)) {
				throw Error("Unable to retrieve creator data")
			}
			videoClass.setIsCreatorDataBeingRetrieved(false)
			const creatorDataHeldInClass: CreatorDataHeldInClass = {
				creatorUsername: creatorDataResponse.data.creatorData.creatorUsername,
				creatorProfilePictureUrl: creatorDataResponse.data.creatorData.creatorProfilePictureUrl,
				videoData: creatorDataResponse.data.videoData
			}
			videoClass.addCreatorData(creatorDataHeldInClass)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.setIsCreatorDataBeingRetrieved(false)
		}
	}, [creatorUsername, fortunaApiClient.videoDataService, videoClass])

	useEffect(() => {
		void retrieveCreatorVideosAndData()
	}, [retrieveCreatorVideosAndData])
}
