import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import ShowMessageToNonCreators from "../../components/show-message-to-non-creators"
import UploadContentTemplate from "../../components/templates/upload-content-template"
import SPLNameInput from "../../components/upload-new-mint-information/spl-name-input"
import ImageUploader from "../../components/upload-new-mint-information/image-uploader"
import VideoUploader from "../../components/upload-new-mint-information/video-uploader"
import SelectNumberShares from "../../components/upload-new-mint-information/select-number-shares"
import SPLDescriptionInput from "../../components/upload-new-mint-information/spl-description-input"
import UploadMintInfoButton from "../../components/upload-new-mint-information/upload-mint-info-button"
import ContentShareBreakdown from "../../components/upload-new-mint-information/content-share-breakdown"
import SplOriginalContentUrlInput from "../../components/upload-new-mint-information/spl-original-content-url-input"
import SelectOfferingSharePriceUsd from "../../components/upload-new-mint-information/select-offering-share-price-usd"
import SelectCreatorOwnershipPercentage from "../../components/upload-new-mint-information/select-creator-ownership-percentage"

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

				<VideoUploader />

				<ImageUploader />

				<SPLNameInput />

				<SPLDescriptionInput />

				<SplOriginalContentUrlInput />
				<div className="flex w-full">
					<div className="flex flex-col w-1/2">
						<div className="mb-4">
							<SelectOfferingSharePriceUsd />
						</div>
						<SelectNumberShares />
						<SelectCreatorOwnershipPercentage />
					</div>
					<div className="w-1/2">
						<ContentShareBreakdown />
					</div>
				</div>
				<UploadMintInfoButton />
			</UploadContentTemplate>
		</>
	)
}

export default observer(UploadContent)
