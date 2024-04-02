import _ from "lodash"
import { useNavigate } from "react-router"
import { useCallback, useMemo } from "react"
import Button from "../button"
import confirmNewSPLDetails from "../../utils/confirm-new-spl-details"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isErrorResponse, isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

interface Props {
	newSplDetails: NewSPLDetails
	selectedImage: File | null
	setError: React.Dispatch<React.SetStateAction<string>>
}

export default function UploadMintInfoButton(props: Props) {
	const { newSplDetails, selectedImage, setError } = props
	const fortunaApiClient = useApiClientContext()
	const navigate = useNavigate()

	const isReadyToSubmit = useMemo(() => {
		return confirmNewSPLDetails(newSplDetails) && !_.isNull(selectedImage)
	}, [newSplDetails, selectedImage])

	const uploadMintInfoOnclick = useCallback(async() => {
		try {
			if (_.isNull(selectedImage)) return
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadImageToS3(selectedImage)
			if (
				!_.isEqual(uploadImageResponse.status, 200) ||
				isMessageResponse(uploadImageResponse.data) ||
				isErrorResponse(uploadImageResponse.data)
			) {
				setError("Error uploading image")
				return
			}

			const createAndMintSPL: CreateAndMintSPL = {
				...newSplDetails,
				imageURL: uploadImageResponse.data.imageUploadUrl,
				fileName: uploadImageResponse.data.fileName,
				uuid: uploadImageResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId
			}

			const createAndMintResponse = await fortunaApiClient.solanaDataService.createAndMintSPL(createAndMintSPL)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error uploading image")
				return
			}

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.solanaDataService, fortunaApiClient.uploadDataService, navigate, newSplDetails, selectedImage, setError])

	return (
		<Button
			title={isReadyToSubmit ? "Submit" : "Please finish fields and image"}
			disabled={!isReadyToSubmit}
			colorClass="bg-yellow-400"
			hoverClass="hover:bg-yellow-500"
			onClick={uploadMintInfoOnclick}
		/>
	)
}
