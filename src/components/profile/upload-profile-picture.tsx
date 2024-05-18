import _ from "lodash"
import { useState } from "react"
import Button from "../button"
import ContentPreview from "../content-preview"
import ShowProfilePicture from "./show-profile-picture"
import ChooseProfilePictureButton from "./choose-profile-picture-button"
import useUploadProfilePicture from "../../hooks/personal-info/upload-profile-picture"

export default function UploadProfilePicture() {
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const uploadProfilePicture = useUploadProfilePicture()

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
			{!_.isNull(previewUrl) && !_.isNull(selectedImage) && (
				<Button
					title="Save"
					colorClass="bg-emerald-200"
					hoverClass="hover:bg-emerald-300"
					onClick={() => uploadProfilePicture(selectedImage, setSelectedImage, setPreviewUrl)}
					className="font-semibold"
				/>
			)}
		</div>
	)
}
