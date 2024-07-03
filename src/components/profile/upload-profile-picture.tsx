import _ from "lodash"
import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { useRef, useState, useCallback } from "react"
import { FaSave, FaTrash, FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useUploadProfilePicture from "../../hooks/personal-info/upload-profile-picture"

// eslint-disable-next-line max-lines-per-function
function UploadProfilePicture() {
	const [isHovered, setIsHovered] = useState(false)
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	const uploadProfilePicture = useUploadProfilePicture()
	const defaultSiteTheme = useDefaultSiteTheme()

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

	const editPictureCallback = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

	const uploadProfilePictureCallback = useCallback(async() => {
		await uploadProfilePicture(selectedImage)
		removeContent()
	}, [removeContent, selectedImage, uploadProfilePicture])

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])

	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }

	if (_.isNull(personalInfoClass)) return null

	if (!_.isNull(previewUrl)) {
		return (
			<div className="relative inline-block my-3">
				<img
					src={previewUrl}
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					style={imageStyle}
				/>
				<div
					className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600 p-1 rounded-full \
						cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<RiPencilFill
						color="white"
						size={22}
						onClick={editPictureCallback}
					/>
				</div>
				<div
					className="absolute top-2 left-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
						cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
				>
					<FaTrash
						color="white"
						size={22}
						onClick={removeContent}
					/>
				</div>
				<div
					className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
					cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
				>
					<FaSave
						color="white"
						size={22}
						onClick={uploadProfilePictureCallback}
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

	return (
		<div className="relative inline-block my-3">
			{personalInfoClass.profilePictureUrl ? (
				<img
					src={personalInfoClass.profilePictureUrl || ""}
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			) : (
				<FaUserCircle
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					color={defaultSiteTheme === "dark" ? "white" : "black" }
				/>
			)}
			<div
				className="absolute top-2 right-2 bg-gray-500 p-1 rounded-full cursor-pointer"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<RiPencilFill
					color="white"
					size={22}
					onClick={editPictureCallback}
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
