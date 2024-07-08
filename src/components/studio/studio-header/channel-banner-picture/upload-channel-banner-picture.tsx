import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave, FaTrash } from "react-icons/fa"
import useUploadChannelBannerPicture from "../../../../hooks/creator/upload-channel-banner-picture"

interface Props {
	previewUrl: string
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	removeContent: () => void
	selectedImage: File | null
	editPictureCallback: () => void
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	fileInputRef: React.RefObject<HTMLInputElement>
}

function UploadChannelBannerPicture(props: Props) {
	const {
		previewUrl,
		handleImageChange,
		removeContent,
		selectedImage,
		editPictureCallback,
		handleMouseEnter,
		handleMouseLeave,
		imageStyle,
		fileInputRef
	} = props
	const uploadChannelBannerPicture = useUploadChannelBannerPicture()

	const uploadChannelBannerPictureCallback = useCallback(async() => {
		await uploadChannelBannerPicture(selectedImage)
		removeContent()
	}, [removeContent, selectedImage, uploadChannelBannerPicture])

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
