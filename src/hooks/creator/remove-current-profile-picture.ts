import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRemoveCurrentProfilePicture(): () => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	const removeCurrentProfilePicture = useCallback(async (
	): Promise<void> => {
		try {
			if (_.isNull(creatorClass)) return

			const response = await fortunaApiClient.creatorDataService.removeCurrentProfilePicture()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				return
			}

			creatorClass.setProfilePictureUrl(null)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.creatorDataService, creatorClass])

	return removeCurrentProfilePicture
}
