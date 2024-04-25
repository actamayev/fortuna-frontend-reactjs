import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import UploadContentTemplate from "../../components/templates/upload-content-template"
import SPLNameInput from "../../components/upload-new-mint-information/spl-name-input"
import ImageUploader from "../../components/upload-new-mint-information/image-uploader"
import VideoUploader from "../../components/upload-new-mint-information/video-uploader"
import SelectNumberShares from "../../components/upload-new-mint-information/select-number-shares"
import SPLDescriptionInput from "../../components/upload-new-mint-information/spl-description-input"
import UploadMintInfoButton from "../../components/upload-new-mint-information/upload-mint-info-button"
import SelectOfferingSharePrice from "../../components/upload-new-mint-information/select-offering-share-price"
import SelectCreatorOwnershipPercentage from "../../components/upload-new-mint-information/select-creator-ownership-percentage"

function UploadContent() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	return (
		<>
			<UploadContentTemplate>

				<VideoUploader />

				<ImageUploader />

				<SPLNameInput />

				<SPLDescriptionInput />

				<div className="mb-4">
					<SelectOfferingSharePrice />
				</div>

				<SelectNumberShares />

				<SelectCreatorOwnershipPercentage />

				<UploadMintInfoButton />
			</UploadContentTemplate>
		</>
	)
}

export default observer(UploadContent)
