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

	// TODO: Show a notification that the link was saved
	const addOrEditSocialLink = useCallback(async (
		socialLink: string,
		socialPlatform: SocialPlatformKey
	): Promise<void> => {
		try {
			if (_.isNull(creatorClass) || _.isEmpty(socialLink.trim())) return

			const response = await fortunaApiClient.creatorDataService.addOrEditSocialPlatformLink(
				socialLink, socialPlatform
			)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				creatorClass.removeSocialPlatformLink(socialPlatform)
			}
		} catch (error) {
			console.error(error)
			if (!_.isNull(creatorClass)) creatorClass.removeSocialPlatformLink(socialPlatform)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	return addOrEditSocialLink
}
