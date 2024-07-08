import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useAddOrEditChannelDescription(): (
	channelDescription: string,
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	const addOrEditChannelDescription = useCallback(async (
		channelDescription: string
	): Promise<void> => {
		try {
			if (
				_.isNull(creatorClass) ||
				channelDescription.length > 1000 ||
				creatorClass.channelDescription === channelDescription
			) return

			const response = await fortunaApiClient.creatorDataService.addOrEditChannelDescription(channelDescription)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.setChannelDescription(channelDescription)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	return addOrEditChannelDescription
}
