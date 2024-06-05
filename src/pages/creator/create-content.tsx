import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import CreateNewVideoTemplate from "../../components/templates/create-new-video-template"
import VideoNameInput from "../../components/create-new-video-information/video-name-input"
import NewVideoSummary from "../../components/create-new-video-information/new-video-summary"
import VideoUploader from "../../components/create-new-video-information/upload-media/video-uploader"
import ImageUploader from "../../components/create-new-video-information/upload-media/image-uploader"
import UploadNewVideoButton from "../../components/create-new-video-information/upload-new-video-button"
import VideoDescriptionInput from "../../components/create-new-video-information/video-description-input"
import ExclusiveContentOptionsSection
	from "../../components/create-new-video-information/exclusive-content/exclusive-content-options-section"
import SelectExclusiveContentListingPriceUsd from "../../components/create-new-video-information/select-exclusive-content-listing-price-usd"

function CreateContent() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/create-content" />
	}

	return (
		<>
			<CreateNewVideoTemplate>

				<div className="mb-2">
					<VideoUploader />
				</div>
				<div className="mb-2">
					<ImageUploader />
				</div>
				<VideoNameInput />

				<VideoDescriptionInput />

				<div className="flex w-full text-zinc-950 dark:text-zinc-200">

					<div className="w-1/3">
						<ExclusiveContentOptionsSection />
					</div>
					<div className="flex flex-col w-1/3">
						<div className="mb-4">
							<SelectExclusiveContentListingPriceUsd />
						</div>
					</div>


					<div className="w-1/3">
						<NewVideoSummary />
					</div>

				</div>
				<UploadNewVideoButton />
			</CreateNewVideoTemplate>
		</>
	)
}

export default observer(CreateContent)
