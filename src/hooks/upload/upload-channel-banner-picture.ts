import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadChannelBannerPicture(): (selectedImage: File | null) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()

	const uploadChannelBannerPicture = useCallback(async (selectedImage: File | null) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(creatorClass)) return
			const uploadChannelBannerPictureResponse = await fortunaApiClient.uploadDataService.uploadChannelBannerPicture(selectedImage)
			if (
				!_.isEqual(uploadChannelBannerPictureResponse.status, 200) ||
				isNonSuccessResponse(uploadChannelBannerPictureResponse.data)
			) {
				return
			}
			creatorClass.setChannelBannerUrl(uploadChannelBannerPictureResponse.data.channelBannerPictureUrl)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass, fortunaApiClient.uploadDataService])

	return uploadChannelBannerPicture
}
