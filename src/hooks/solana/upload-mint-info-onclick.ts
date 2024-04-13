import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUploadMintInfoOnclick(): (
	newSplDetails: NewSPLDetails,
	selectedImage: File | null,
	selectedVideo: File | null,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	// eslint-disable-next-line complexity
	const uploadMintInfoOnclick = useCallback(async (
		newSplDetails: NewSPLDetails,
		selectedImage: File | null,
		selectedVideo: File | null,
		setError: React.Dispatch<React.SetStateAction<string>>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		try {
			setLoading(true)
			if (_.isNull(selectedImage) || _.isNull(selectedVideo) || _.isNull(solanaClass)) return

			setStatus("Uploading Video")
			const uploadVideoResponse = await fortunaApiClient.uploadDataService.uploadVideoToS3(selectedVideo)
			if (!_.isEqual(uploadVideoResponse.status, 200) || isNonSuccessResponse(uploadVideoResponse.data)) {
				setError("Error uploading image")
				return
			}

			setStatus("Uploading Thumbnail/picture")
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadImageToS3(
				selectedImage, uploadVideoResponse.data.uuid
			)
			if (!_.isEqual(uploadImageResponse.status, 200) || isNonSuccessResponse(uploadImageResponse.data)) {
				setError("Error uploading image")
				return
			}

			const createAndMintSPL: CreateAndMintSPL = {
				...newSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				videoUrl: uploadVideoResponse.data.videoUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId,
				uploadedVideoId: uploadVideoResponse.data.uploadedVideoId
			}

			setStatus("Creating and Minting Token")
			const createAndMintResponse = await fortunaApiClient.solanaDataService.createAndMintSPL(createAndMintSPL)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error minting")
				return
			}

			const myContent: MyContent = {
				...newSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				videoUrl: uploadVideoResponse.data.videoUploadUrl,
				splId: createAndMintResponse.data.newSPLId,
				mintAddress: createAndMintResponse.data.mintAddress
			}

			solanaClass.addContent(myContent)

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
