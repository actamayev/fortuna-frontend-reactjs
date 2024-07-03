import _ from "lodash"
import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { useRef, useState, useCallback } from "react"
import { FaSave, FaTrash, FaUserCircle } from "react-icons/fa"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useUploadProfilePicture from "../../hooks/personal-info/upload-profile-picture"

// eslint-disable-next-line max-lines-per-function
function UploadProfilePicture() {
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	const uploadProfilePicture = useUploadProfilePicture()

	const removeContent = useCallback(() => {
		setSelectedImage(null)
		setPreviewUrl(null)
	}, [setPreviewUrl])

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
			removeContent()
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [removeContent])

	const onClickButtonCallback = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

	const uploadProfilePictureCallback = useCallback(async() => {
		await uploadProfilePicture(selectedImage)
		removeContent()
	}, [removeContent, selectedImage, uploadProfilePicture])

	if (_.isNull(personalInfoClass)) return null

	console.log(previewUrl)
	if (!_.isNull(previewUrl)) {
		return (
			<div className="relative inline-block my-3">
				<img
					src={previewUrl}
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					onClick={onClickButtonCallback}
				/>
				<div className="absolute top-2 right-2 bg-gray-500 p-1 rounded-full cursor-pointer">
					<RiPencilFill
						color="white"
						size={22}
						onClick={onClickButtonCallback}
					/>
				</div>
				<div className="absolute top-2 left-2 bg-gray-500 p-1 rounded-full cursor-pointer">
					<FaTrash
						color="white"
						size={22}
						onClick={removeContent}
					/>
				</div>
				<div className="absolute bottom-2 right-2 bg-gray-500 p-1 rounded-full cursor-pointer">
					<FaSave
						color="white"
						size={22}
						onClick={uploadProfilePictureCallback}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className="relative inline-block my-3">
			{personalInfoClass.profilePictureUrl ? (
				<img
					src={personalInfoClass.profilePictureUrl || ""}
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					onClick={onClickButtonCallback}
				/>
			) : (
				<FaUserCircle
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					onClick={onClickButtonCallback}
				/>
			)}
			<div className="absolute top-3 right-2 bg-gray-500 p-1 rounded-full cursor-pointer">
				<RiPencilFill
					color="white"
					size={22}
					onClick={onClickButtonCallback}
				/>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/jpeg, image/png"
				style={{ display: "none" }}
				max={1}
			/>
		</div>
	)
}

export default observer(UploadProfilePicture)
