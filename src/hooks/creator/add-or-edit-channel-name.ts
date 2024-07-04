import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useAddOrEditChannelName(): (
	channelName: string,
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const addOrEditChannelName = useCallback(async (
		channelName: string,
	): Promise<void> => {
		try {
			if (
				_.isNull(creatorClass) ||
				creatorClass.channelName === channelName ||
				(_.isEmpty(creatorClass.channelName) && (
					personalInfoClass?.username && personalInfoClass.username === channelName
				))
			) return

			const response = await fortunaApiClient.creatorDataService.addOrEditChannelName(channelName)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.setChannelName(channelName)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, personalInfoClass?.username])

	return addOrEditChannelName
}
