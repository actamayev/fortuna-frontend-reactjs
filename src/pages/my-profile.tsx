import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useRef, useCallback } from "react"
import Button from "../components/button"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import useUploadProfilePicture from "../hooks/personal-info/upload-profile-picture"
import ContentPreview from "../components/upload-new-mint-information/content-preview"

function MyProfile() {
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	const uploadProfilePicture = useUploadProfilePicture()

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			setSelectedImage(file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			setSelectedImage(null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [])

	if (_.isNull(personalInfoClass)) return null

	return (
		<div>
			<div className="my-3">
				{personalInfoClass.profilePictureUrl && (
					<img
						width="140"
						src={personalInfoClass.profilePictureUrl}
						className="rounded-lg"
					/>
				)}
			</div>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/*"
				style={{ display: "none" }}
				max={1}
			/>
			{_.isNull(previewUrl) && (
				<Button
					title={`Choose a ${personalInfoClass.profilePictureUrl ? "new" : ""} Profile Picture`}
					colorClass="bg-sky-300"
					hoverClass="hover:bg-sky-400"
					onClick={() => fileInputRef.current?.click()}
					className="font-semibold"
				/>
			)}

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

export default observer(MyProfile)
