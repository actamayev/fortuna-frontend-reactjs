import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../typed-navigate"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isErrorResponse, isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useUploadMintInfoOnclick(): (
	newSplDetails: NewSPLDetails,
	selectedImage: File | null,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const uploadMintInfoOnclick = useCallback(async (
		newSplDetails: NewSPLDetails,
		selectedImage: File | null,
		setError: React.Dispatch<React.SetStateAction<string>>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			setLoading(true)
			if (_.isNull(selectedImage) || _.isNull(solanaClass)) return
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
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				fileName: uploadImageResponse.data.fileName,
				uuid: uploadImageResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId
			}

			const createAndMintResponse = await fortunaApiClient.solanaDataService.createAndMintSPL(createAndMintSPL)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error minting")
				return
			}

			const myContent: MyContent = {
				...newSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				splId: createAndMintResponse.data.splId,
				mintAddress: createAndMintResponse.data.mintAddress
			}

			solanaClass.addContent(myContent)

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [fortunaApiClient.solanaDataService, fortunaApiClient.uploadDataService, navigate, solanaClass])

	return uploadMintInfoOnclick
}
