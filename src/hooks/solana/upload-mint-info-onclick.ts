import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadMintInfoOnclick(): (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	// eslint-disable-next-line complexity
	const uploadMintInfoOnclick = useCallback(async (
		setError: React.Dispatch<React.SetStateAction<string>>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		try {
			setLoading(true)
			if (
				_.isNull(solanaClass) ||
				_.isNull(solanaClass.newSplDetails.selectedVideo) ||
				_.isNull(solanaClass.newSplDetails.selectedImage)
			) return

			setStatus("Uploading Video")
			const uploadVideoResponse = await fortunaApiClient.uploadDataService.uploadVideoToS3(solanaClass.newSplDetails.selectedVideo)
			if (!_.isEqual(uploadVideoResponse.status, 200) || isNonSuccessResponse(uploadVideoResponse.data)) {
				setError("Error uploading image")
				return
			}

			setStatus("Uploading Thumbnail/picture")
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadImageToS3(
				solanaClass.newSplDetails.selectedImage, uploadVideoResponse.data.uuid
			)
			if (!_.isEqual(uploadImageResponse.status, 200) || isNonSuccessResponse(uploadImageResponse.data)) {
				setError("Error uploading image")
				return
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { selectedImage, selectedVideo, ...restOfSplDetails } = solanaClass.newSplDetails

			const createAndMintSPL: CreateAndMintSPL = {
				...restOfSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				videoUrl: uploadVideoResponse.data.videoUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId,
				uploadedVideoId: uploadVideoResponse.data.uploadedVideoId,
			}

			setStatus("Creating and Minting Token")
			const createAndMintResponse = await fortunaApiClient.solanaDataService.createAndMintSPL(createAndMintSPL)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error minting")
				return
			}

			const myContent: MyContent = {
				...restOfSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				videoUrl: uploadVideoResponse.data.videoUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				splId: createAndMintResponse.data.newSPLId,
				mintAddress: createAndMintResponse.data.mintAddress
			}

			solanaClass.addContent(myContent)
			solanaClass.resetNewSplDetails()

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
			setStatus("")
		}
	}, [fortunaApiClient.solanaDataService, fortunaApiClient.uploadDataService, navigate, solanaClass])

	return uploadMintInfoOnclick
}
