import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useRef, useCallback } from "react"
import Button from "../button"
import ContentPreview from "../content-preview"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useUploadProfilePicture from "../../hooks/personal-info/upload-profile-picture"

function UploadProfilePicture() {
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	const uploadProfilePicture = useUploadProfilePicture()

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 150MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}
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
				accept="image/jpeg, image/png"
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

export default observer(UploadProfilePicture)
