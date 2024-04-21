import _ from "lodash"
import { useCallback } from "react"
import useRetrieveSolPrice from "../retrieve-sol-price"
import useTypedNavigate from "../../navigate/typed-navigate"
import useConfirmNewSplDetails from "./confirm-new-spl-details"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useUploadMintInfoOnclick(): (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const confirmNewSplDetails = useConfirmNewSplDetails()

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
				_.isNull(personalInfoClass) ||
				_.isNull(solanaClass.newSplDetails.selectedVideo) ||
				_.isNull(solanaClass.newSplDetails.selectedImage) ||
				confirmNewSplDetails === false
			) return

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return
			if (personalInfoClass.getDefaultCurrency() === "sol") {
				solanaClass.newSplDetails.offeringSharePriceUsd =
					solanaClass.newSplDetails.offeringSharePriceSol * solanaClass.solPriceDetails.solPriceInUSD
			} else {
				solanaClass.newSplDetails.offeringSharePriceSol =
				solanaClass.newSplDetails.offeringSharePriceUsd / solanaClass.solPriceDetails.solPriceInUSD
			}

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
	}, [confirmNewSplDetails, fortunaApiClient.solanaDataService,fortunaApiClient.uploadDataService,
		navigate,personalInfoClass, retrieveSolPrice, solanaClass
	])

	return uploadMintInfoOnclick
}
