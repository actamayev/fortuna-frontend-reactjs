import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../../navigate/typed-navigate"
import useRetrieveSolPrice from "../../solana/retrieve-sol-price"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import useConfirmNewVideoDetails from "./confirm-new-video-details"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useMarketContext } from "../../../contexts/market-context"
import { useCreatorContext } from "../../../contexts/creator-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useCreateVideoOnclick(): (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const creatorClass = useCreatorContext()
	const marketClass = useMarketContext()
	const personalInfoClass = usePersonalInfoContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const confirmNewVideoDetails = useConfirmNewVideoDetails()

	// eslint-disable-next-line complexity
	const createVideoOnclick = useCallback(async (
		setError: React.Dispatch<React.SetStateAction<string>>,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(creatorClass) ||
				_.isNull(personalInfoClass) ||
				_.isNull(marketClass) ||
				_.isNull(creatorClass.newVideoDetails.selectedVideo) ||
				_.isNull(creatorClass.newVideoDetails.selectedImage) ||
				confirmNewVideoDetails === false
			) return

			creatorClass.setIsNewVideoLoading(true)

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return

			setStatus("Uploading Video")
			const uploadVideoResponse = await fortunaApiClient.uploadDataService.uploadVideoToS3(creatorClass.newVideoDetails.selectedVideo)
			if (!_.isEqual(uploadVideoResponse.status, 200) || isNonSuccessResponse(uploadVideoResponse.data)) {
				setError("Error uploading image")
				return
			}

			setStatus("Uploading Thumbnail")
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadImageToS3(
				creatorClass.newVideoDetails.selectedImage, uploadVideoResponse.data.uuid
			)
			if (!_.isEqual(uploadImageResponse.status, 200) || isNonSuccessResponse(uploadImageResponse.data)) {
				setError("Error uploading image")
				return
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { selectedImage, selectedVideo, ...restOfVideoDetails } = creatorClass.newVideoDetails

			const createVideoObject: CreateVideo = {
				...restOfVideoDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId,
				uploadedVideoId: uploadVideoResponse.data.uploadedVideoId,
			}

			setStatus("Creating and Minting Token")
			const createAndMintResponse = await fortunaApiClient.creatorDataService.createVideo(createVideoObject)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error minting")
				return
			}

			const myContent: MyContent = {
				...restOfVideoDetails,
				videoId: createAndMintResponse.data.newVideoId,
				videoListingStatus: "LISTED",
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
			}

			creatorClass.addContent(myContent)
			creatorClass.resetNewVideoDetails()

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		} finally {
			setStatus("")
			if (!_.isNull(creatorClass)) creatorClass.setIsNewVideoLoading(false)
		}
	}, [solanaClass, creatorClass, personalInfoClass, marketClass, confirmNewVideoDetails,
		retrieveSolPrice, fortunaApiClient.uploadDataService, fortunaApiClient.creatorDataService, navigate])

	return createVideoOnclick
}
