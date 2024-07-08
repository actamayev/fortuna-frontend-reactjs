import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRemoveCurrentChannelBannerPicture(): (
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	const removeCurrentChannelBannerPicture = useCallback(async (
		setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (_.isNull(creatorClass)) return

			const response = await fortunaApiClient.creatorDataService.removeCurrentChannelBannerPicture()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				return
			}

			creatorClass.setChannelBannerUrl(null)
			setIsDeletingCurrentPicture(false)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	return removeCurrentChannelBannerPicture
}
