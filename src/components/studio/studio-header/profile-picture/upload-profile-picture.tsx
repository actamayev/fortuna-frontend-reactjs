import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave, FaTrash } from "react-icons/fa"
import useUploadProfilePicture from "../../../../hooks/personal-info/upload-profile-picture"

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

function UploadProfilePicture(props: Props) {
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
	const uploadProfilePicture = useUploadProfilePicture()

	const uploadProfilePictureCallback = useCallback(async() => {
		await uploadProfilePicture(selectedImage)
		removeContent()
	}, [removeContent, selectedImage, uploadProfilePicture])

	// TODO: Add ability to delete current pfp (resets to stock pfp picture). Same for banner. It should update is_active to false

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }} >
			<img
				src={previewUrl}
				className="w-32 h-32 rounded-full object-cover cursor-pointer"
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

export default observer(UploadProfilePicture)
