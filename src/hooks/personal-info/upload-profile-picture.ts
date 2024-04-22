import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadProfilePicture(): (
	selectedImage: File | null,
	setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>,
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const uploadProfilePicture = useCallback(async (
		selectedImage: File | null,
		setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>,
		setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
	) => {
		try {
			if (_.isNull(selectedImage) || _.isNull(personalInfoClass)) return
			const uploadProfilePictureResponse = await fortunaApiClient.uploadDataService.uploadProfilePicture(selectedImage)
			if (!_.isEqual(uploadProfilePictureResponse.status, 200) || isErrorResponses(uploadProfilePictureResponse.data)) {
				return
			}
			personalInfoClass.profilePictureUrl = uploadProfilePictureResponse.data.profilePictureUrl
			setSelectedImage(null)
			setPreviewUrl(null)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.uploadDataService, personalInfoClass])

	return uploadProfilePicture
}
