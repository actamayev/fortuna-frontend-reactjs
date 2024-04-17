import _ from "lodash"
import { observer } from "mobx-react"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
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
			<CreatorHeader />

			<VideoUploader />

			<ImageUploader />

			<SPLNameInput />

			<SPLDescriptionInput />

			<SelectOfferingSharePrice />

			<SelectNumberShares />

			<SelectCreatorOwnershipPercentage />

			<UploadMintInfoButton />
		</>
	)
}

export default observer(UploadContent)
