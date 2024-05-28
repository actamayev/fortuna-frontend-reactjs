import _ from "lodash"
import { useCallback } from "react"
import useRetrieveSolPrice from "../retrieve-sol-price"
import useTypedNavigate from "../../navigate/typed-navigate"
import useConfirmNewSplDetails from "./confirm-new-spl-details"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useExchangeContext } from "../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

export default function useUploadMintInfoOnclick(): (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const navigate = useTypedNavigate()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const confirmNewSplDetails = useConfirmNewSplDetails()

	// eslint-disable-next-line complexity
	const uploadMintInfoOnclick = useCallback(async (
		setError: React.Dispatch<React.SetStateAction<string>>,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(personalInfoClass) ||
				_.isNull(exchangeClass) ||
				_.isNull(positionsAndTransactionsClass) ||
				_.isNull(solanaClass.newSplDetails.selectedVideo) ||
				_.isNull(solanaClass.newSplDetails.selectedImage) ||
				confirmNewSplDetails === false
			) return

			solanaClass.setIsNewSplLoading(true)

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return

			setStatus("Uploading Video")
			const uploadVideoResponse = await fortunaApiClient.uploadDataService.uploadVideoToS3(solanaClass.newSplDetails.selectedVideo)
			if (!_.isEqual(uploadVideoResponse.status, 200) || isNonSuccessResponse(uploadVideoResponse.data)) {
				setError("Error uploading image")
				return
			}

			setStatus("Uploading Thumbnail")
			const uploadImageResponse = await fortunaApiClient.uploadDataService.uploadImageToS3(
				solanaClass.newSplDetails.selectedImage, uploadVideoResponse.data.uuid
			)
			if (!_.isEqual(uploadImageResponse.status, 200) || isNonSuccessResponse(uploadImageResponse.data)) {
				setError("Error uploading image")
				return
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { selectedImage, selectedVideo, ...restOfSplDetails } = solanaClass.newSplDetails
			if (restOfSplDetails.isContentExclusive === false) {
				delete restOfSplDetails.valueNeededToAccessExclusiveContentUsd
				delete restOfSplDetails.priceToInstantlyAccessExclusiveContentUsd
				delete restOfSplDetails.allowValueFromSameCreatorTokensForExclusiveContent
				delete restOfSplDetails.isContentInstantlyAccessible
			}
			if (restOfSplDetails.isContentInstantlyAccessible === false) {
				delete restOfSplDetails.priceToInstantlyAccessExclusiveContentUsd
			}

			const createAndMintSPL: CreateAndMintSPL = {
				...restOfSplDetails,
				imageUrl: uploadImageResponse.data.imageUploadUrl,
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
				splId: createAndMintResponse.data.newSPLId,
				splListingStatus: "LISTED",
				imageUrl: uploadImageResponse.data.imageUploadUrl,
				uuid: uploadVideoResponse.data.uuid,
				mintAddress: createAndMintResponse.data.mintAddress
			}

			positionsAndTransactionsClass.addContent(myContent)
			solanaClass.resetNewSplDetails()

			navigate("/creator/my-content")
		} catch (error) {
			console.error(error)
		} finally {
			setStatus("")
			if (!_.isNull(solanaClass)) solanaClass.setIsNewSplLoading(false)
		}
	}, [solanaClass, personalInfoClass, exchangeClass, positionsAndTransactionsClass, confirmNewSplDetails,
		retrieveSolPrice, fortunaApiClient.uploadDataService, fortunaApiClient.solanaDataService, navigate])

	return uploadMintInfoOnclick
}
