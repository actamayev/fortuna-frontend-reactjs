import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import CreateNewVideoTemplate from "../../components/templates/create-new-video-template"
import VideoNameInput from "../../components/create-new-video-information/video-name-input"
import VideoUploader from "../../components/create-new-video-information/upload-media/video-uploader"
import ImageUploader from "../../components/create-new-video-information/upload-media/image-uploader"
import UploadNewVideoButton from "../../components/create-new-video-information/upload-new-video-button"
import VideoDescriptionInput from "../../components/create-new-video-information/video-description-input"
import NewVideoMonetizationSummary from "../../components/create-new-video-information/new-video-summary/new-video-monetization-summary"
import ExclusiveContentTierMap from "../../components/create-new-video-information/exclusive-content/exclusive-content-tier-map"
import IsContentExclusiveSlider from "../../components/create-new-video-information/exclusive-content/is-content-exclusive-slider"

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

				<div className="text-zinc-950 dark:text-zinc-200">
					<IsContentExclusiveSlider />
				</div>
				<div className="flex w-full text-zinc-950 dark:text-zinc-200">
					<div className="w-2/3 mb-4">
						<ExclusiveContentTierMap />
					</div>
					<div className="w-1/3">
						<NewVideoMonetizationSummary />
					</div>

				</div>
				<UploadNewVideoButton />
			</CreateNewVideoTemplate>
		</>
	)
}

export default observer(CreateContent)
