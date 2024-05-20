import _ from "lodash"
import { useParams } from "react-router-dom"
import { useCallback, useEffect } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveCreatorVideosAndDataUseEffect(): void {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
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
	}, [videoClass, creatorUsername, fortunaApiClient.videoDataService])

	useEffect(() => {
		void retrieveCreatorVideosAndData()
	}, [retrieveCreatorVideosAndData])
}
