import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import ShowMessageToNonCreators from "../../components/show-message-to-non-creators"
import UploadContentTemplate from "../../components/templates/upload-content-template"
import SPLNameInput from "../../components/upload-new-mint-information/spl-name-input"
import SelectNumberShares from "../../components/upload-new-mint-information/select-number-shares"
import CreateTokenSummary from "../../components/upload-new-mint-information/create-token-summary"
import SPLDescriptionInput from "../../components/upload-new-mint-information/spl-description-input"
import ImageUploader from "../../components/upload-new-mint-information/upload-media/image-uploader"
import VideoUploader from "../../components/upload-new-mint-information/upload-media/video-uploader"
import UploadMintInfoButton from "../../components/upload-new-mint-information/upload-mint-info-button"
import ValueNeededToAccessExclusiveContent
	from "../../components/upload-new-mint-information/exclusive-content/value-needed-to-access-exclusive-content"
import SplOriginalContentUrlInput from "../../components/upload-new-mint-information/spl-original-content-url-input"
import SelectOfferingSharePriceUsd from "../../components/upload-new-mint-information/select-offering-share-price-usd"
import ListingPriceToAccessExclusiveContentUsd
	from "../../components/upload-new-mint-information/exclusive-content/listing-price-to-access-exclusive-content-usd"
import SelectCreatorOwnershipPercentage from "../../components/upload-new-mint-information/select-creator-ownership-percentage"
import IsContentExclusiveSlider from "../../components/upload-new-mint-information/exclusive-content/is-content-exclusive-slider"
import AllowValueFromSameCreatorTokensForExclusiveContent
	from "../../components/upload-new-mint-information/exclusive-content/allow-value-from-same-creator-tokens-for-exclusive-content"

function UploadContent() {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	if (personalInfoClass?.isApprovedToBeCreator !== true) {
		return <ShowMessageToNonCreators />
	}

	return (
		<>
			<UploadContentTemplate>

				<div className="mb-2">
					<VideoUploader />
				</div>
				<div className="mb-2">
					<ImageUploader />
				</div>
				<SPLNameInput />

				<SPLDescriptionInput />

				<SplOriginalContentUrlInput />
				<div className="flex w-full">
					<div className="flex flex-col w-1/3">
						<div className="mb-4">
							<SelectOfferingSharePriceUsd />
						</div>
						<div className="mb-4">
							<SelectNumberShares />
						</div>
						<div className="mb-2">
							<SelectCreatorOwnershipPercentage />
						</div>
					</div>
					<div className="w-1/3">
						<div className="mb-4">
							<IsContentExclusiveSlider />
						</div>
						<div className="mb-4">
							<ValueNeededToAccessExclusiveContent />
						</div>
						<div className="mb-4">
							<ListingPriceToAccessExclusiveContentUsd />
						</div>
						<div className="mb-4">
							<AllowValueFromSameCreatorTokensForExclusiveContent />
						</div>
					</div>
					<div className="w-1/3">
						<CreateTokenSummary />
					</div>
				</div>
				<UploadMintInfoButton />
			</UploadContentTemplate>
		</>
	)
}

export default observer(UploadContent)
