import _ from "lodash"
import { observer } from "mobx-react"
import { FaSave, FaTrash } from "react-icons/fa"
import { useRef, useState, useCallback } from "react"
import ShowCurrentChannelBannerPicture from "./show-current-channel-banner-picture"
import useUploadChannelBannerPicture from "../../../../hooks/creator/upload-channel-banner-picture"

// eslint-disable-next-line max-lines-per-function
function UploadChannelBannerPicture() {
	const [isHovered, setIsHovered] = useState(false)
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const uploadChannelBannerPicture = useUploadChannelBannerPicture()

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

	const uploadChannelBannerPictureCallback = useCallback(async() => {
		await uploadChannelBannerPicture(selectedImage)
		removeContent()
	}, [removeContent, selectedImage, uploadChannelBannerPicture])

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])

	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }

	if (_.isNull(previewUrl)) {
		return (
			<ShowCurrentChannelBannerPicture
				handleImageChange = {handleImageChange}
				fileInputRef={fileInputRef}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
				imageStyle={imageStyle}
				editPictureCallback={editPictureCallback}
			/>
		)
	}

	return (
		<div className="relative inline-block w-full">
			<img
				src={previewUrl}
				className="object-cover cursor-pointer w-full h-44 rounded"
				onClick={editPictureCallback}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={imageStyle}
			/>
			<div
				className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
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
					onClick={uploadChannelBannerPictureCallback}
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

export default observer(UploadChannelBannerPicture)
