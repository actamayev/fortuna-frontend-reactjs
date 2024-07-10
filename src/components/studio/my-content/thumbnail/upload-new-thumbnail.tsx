import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave, FaTrash } from "react-icons/fa"
import useUploadNewThumnailPicture from "../../../../hooks/upload/upload-new-thumbnail-picture"

interface Props {
	content: MyContent
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

function UploadNewThumbnail(props: Props) {
	const {
		content,
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
	const uploadNewThumbnailPicture = useUploadNewThumnailPicture()

	const uploadNewThumbnailPictureCallback = useCallback(async() => {
		await uploadNewThumbnailPicture(selectedImage, content.uuid, content.videoId)
		removeContent()
	}, [content.uuid, content.videoId, removeContent, selectedImage, uploadNewThumbnailPicture])

	// TODO: Make sure the aspect ratio applies when uploading a new thumbnail.
	//removed the aspect ratio stuff for now bc it was messing with the trash/save.
	// eslint-disable-next-line max-len
	// Also, make sure to either disable the trash/save while it's processing, or make it dissappear instantly to prevent doubleclicks. Fix everywhere
	return (
		<div className="relative inline-block">
			<img
				src={previewUrl}
				className="object-cover rounded-lg"
				onClick={editPictureCallback}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{ filter: content.videoListingStatus === "UNLISTED" ? "brightness(0.6)" : "none", ...imageStyle}}
			/>
			<div
				className="absolute top-2 -right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
					cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
			>
				<FaTrash
					color="white"
					size={22}
					onClick={removeContent}
				/>
			</div>
			<div
				className="absolute bottom-2 -right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
					cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
			>
				<FaSave
					color="white"
					size={22}
					onClick={uploadNewThumbnailPictureCallback}
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

export default observer(UploadNewThumbnail)
