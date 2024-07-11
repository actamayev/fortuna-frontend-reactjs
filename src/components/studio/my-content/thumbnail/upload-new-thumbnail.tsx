import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaSave, FaTrash } from "react-icons/fa"
import LoadingOval from "../../../loading-oval"
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
	const [isLoading, setIsLoading] = useState(false)

	const uploadNewThumbnailPictureCallback = useCallback(async() => {
		if (isLoading === true) return
		await uploadNewThumbnailPicture(selectedImage, content.uuid, content.videoId, setIsLoading)
		removeContent()
	}, [content.uuid, content.videoId, isLoading, removeContent, selectedImage, uploadNewThumbnailPicture])

	return (
		<div>
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={previewUrl}
					className="object-cover rounded-lg"
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					style={{
						filter: content.videoListingStatus === "UNLISTED" ? "brightness(0.6)" : "none",
						...imageStyle
					}}
				/>
			</div>
			<div
				className="absolute top-2 -right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
					cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
				onClick={removeContent}
			>
				<FaTrash color="white" size={22} />
			</div>
			<div
				className={`absolute bottom-2 -right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full 
					${isLoading ? "" : "hover:bg-green-600 dark:hover:bg-green-700 cursor-pointer"}`}
				onClick={uploadNewThumbnailPictureCallback}
			>
				{isLoading ?
					<LoadingOval /> :
					<FaSave color="white" size={22} />
				}
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
