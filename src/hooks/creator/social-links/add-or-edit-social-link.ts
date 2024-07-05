import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useAddOrEditSocialLink(): (
	socialLink: string,
	socialPlatform: SocialPlatformKey
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	const addOrEditSocialLink = useCallback(async (
		socialLink: string,
		socialPlatform: SocialPlatformKey
	): Promise<void> => {
		try {
			if (_.isNull(creatorClass)) return

			const response = await fortunaApiClient.creatorDataService.addOrEditSocialPlatformLink(
				socialLink, socialPlatform
			)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.addSocialPlatformLink({ socialLink, socialPlatform })
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	return addOrEditSocialLink
}
