import _ from "lodash"
import { useState } from "react"
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
	const [newSplDetails, setNewSplDetails] = useState<NewSPLDetails>({
		splName: "",
		numberOfShares: 0,
		offeringSharePriceSol: 0,
		description: "",
		creatorOwnershipPercentage: 0
	})
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	return (
		<>
			<CreatorHeader />

			<VideoUploader
				selectedVideo={selectedVideo}
				setSelectedVideo={setSelectedVideo}
			/>

			<ImageUploader
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>

			<SPLNameInput
				splDetails={newSplDetails}
				setNewSplDetails={setNewSplDetails}
			/>

			<SPLDescriptionInput
				splDetails={newSplDetails}
				setNewSplDetails={setNewSplDetails}
			/>

			<SelectOfferingSharePrice
				splDetails={newSplDetails}
				setNewSplDetails={setNewSplDetails}
			/>

			<SelectNumberShares
				splDetails={newSplDetails}
				setNewSplDetails={setNewSplDetails}
			/>

			<SelectCreatorOwnershipPercentage
				splDetails={newSplDetails}
				setNewSplDetails={setNewSplDetails}
			/>

			<UploadMintInfoButton
				newSplDetails={newSplDetails}
				selectedImage={selectedImage}
				selectedVideo={selectedVideo}
			/>
		</>
	)
}

export default observer(UploadContent)
