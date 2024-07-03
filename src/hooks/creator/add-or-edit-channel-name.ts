import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useAddOrEditChannelName(): (
	channelName: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	const addOrEditChannelName = useCallback(async (
		channelName: string,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	): Promise<void> => {
		try {
			if (_.isNull(creatorClass)) return

			setIsLoading(true)

			const response = await fortunaApiClient.creatorDataService.addOrEditChannelName(channelName)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.channelName = channelName
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	return addOrEditChannelName
}
