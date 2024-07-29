import { observer } from "mobx-react"
import PageHelmet from "../../components/helmet/page-helmet"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import CreateNewVideoTemplate from "../../components/templates/create-new-video-template"
import VideoNameInput from "../../components/create-new-video-information/video-name-input"
import VideoUploader from "../../components/create-new-video-information/upload-media/video-uploader"
import ImageUploader from "../../components/create-new-video-information/upload-media/image-uploader"
import AddVideoTagsSection from "../../components/create-new-video-information/add-video-tags-section"
import UploadNewVideoButton from "../../components/create-new-video-information/upload-new-video-button"
import VideoDescriptionInput from "../../components/create-new-video-information/video-description-input"
import ExclusiveContentTierMap from "../../components/create-new-video-information/exclusive-content/exclusive-content-tier-map"
import IsContentExclusiveSlider from "../../components/create-new-video-information/exclusive-content/is-content-exclusive-slider"
import NewVideoMonetizationSummary from "../../components/create-new-video-information/new-video-summary/new-video-monetization-summary"

function CreateContent() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/creator/create-content" />
				<ShowAuthToNullUser whereToNavigate="/creator/create-content" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/creator/create-content" />
			<CreateNewVideoTemplate>

				<div className="flex flex-row space-x-4 w-full mb-2">
					<VideoUploader />
					<ImageUploader />
				</div>
				<VideoNameInput />

				<VideoDescriptionInput />

				<AddVideoTagsSection />

				<div className="text-zinc-950 dark:text-zinc-200 mt-2 mb-1">
					<IsContentExclusiveSlider />
				</div>
				<div className="flex w-full text-zinc-950 dark:text-zinc-200">
					<div className="w-2/3 mb-4 mr-4">
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
