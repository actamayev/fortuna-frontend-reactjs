import { useState } from "react"
import ContentPreview from "../content-preview"
import ShowProfilePicture from "./show-profile-picture"
import SaveProfilePictureButton from "./save-profile-picture-button"
import ChooseProfilePictureButton from "./choose-profile-picture-button"

export default function UploadProfilePicture() {
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)

	return (
		<div>
			<div className="my-3">
				<ShowProfilePicture />
			</div>

			<ChooseProfilePictureButton
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
				setSelectedImage={setSelectedImage}
			/>

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrlNull={() => setPreviewUrl(null)}
				setSelectedContentNull={() => setSelectedImage(null)}
			>
				<img
					src={previewUrl || ""}
					style={{ maxWidth: "35%", height: "auto" }}
				/>
			</ContentPreview>
			<SaveProfilePictureButton
				previewUrl={previewUrl}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
				setPreviewUrl={setPreviewUrl}
			/>
		</div>
	)
}
