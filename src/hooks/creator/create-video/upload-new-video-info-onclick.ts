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

export default function useUploadMintInfoOnclick(): (
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
	const confirmNewSplDetails = useConfirmNewVideoDetails()

	// eslint-disable-next-line complexity
	const uploadMintInfoOnclick = useCallback(async (
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
				confirmNewSplDetails === false
			) return

			creatorClass.setIsNewSplLoading(true)

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
			const { selectedImage, selectedVideo, ...restOfSplDetails } = creatorClass.newVideoDetails

			const createAndMintSPL: CreateVideo = {
				...restOfSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				uploadedImageId: uploadImageResponse.data.uploadedImageId,
				uploadedVideoId: uploadVideoResponse.data.uploadedVideoId,
			}

			setStatus("Creating and Minting Token")
			const createAndMintResponse = await fortunaApiClient.creatorDataService.createVideo(createAndMintSPL)

			if (!_.isEqual(createAndMintResponse.status, 200) || isNonSuccessResponse(createAndMintResponse.data)) {
				setError("Error minting")
				return
			}

			const myContent: MyContent = {
				...restOfSplDetails,
				videoId: createAndMintResponse.data.newVideoId,
				videoListingStatus: "LISTED",
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
			}

			creatorClass.addContent(myContent)
			creatorClass.resetNewSplDetails()

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		} finally {
			setStatus("")
			if (!_.isNull(creatorClass)) creatorClass.setIsNewSplLoading(false)
		}
	}, [solanaClass, creatorClass, personalInfoClass, marketClass, confirmNewSplDetails,
		retrieveSolPrice, fortunaApiClient.uploadDataService, fortunaApiClient.creatorDataService, navigate])

	return uploadMintInfoOnclick
}
