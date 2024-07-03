import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadProfilePicture(): (selectedImage: File | null) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const uploadProfilePicture = useCallback(async (selectedImage: File | null) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(personalInfoClass)) return
			const uploadProfilePictureResponse = await fortunaApiClient.uploadDataService.uploadProfilePicture(selectedImage)
			if (!_.isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
				return
			}
			personalInfoClass.profilePictureUrl = uploadProfilePictureResponse.data.profilePictureUrl
		} catch (error) {
			console.error(error)
		}
	}, [personalInfoClass, fortunaApiClient.uploadDataService])

	return uploadProfilePicture
}
