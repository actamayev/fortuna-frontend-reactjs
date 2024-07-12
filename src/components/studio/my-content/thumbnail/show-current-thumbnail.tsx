import { observer } from "mobx-react"
import SoldOutSticker from "../../../sold-out-sticker"

interface Props {
	content: MyContent
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentThumbnail(props: Props) {
	const {
		content,
		handleImageChange,
		fileInputRef,
		handleMouseEnter,
		handleMouseLeave,
		imageStyle,
		editPictureCallback
	} = props

	return (
		<div>
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={content.imageUrl}
					alt={content.videoName}
					className="object-cover rounded-lg cursor-pointer w-full h-full"
					style={{
						filter: content.videoListingStatus === "UNLISTED" ? "brightness(0.6)" : "none",
						...imageStyle
					}}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			</div>
			<SoldOutSticker
				videoListingStatus={content.videoListingStatus}
				backgroundColor="bg-green-600"
			/>
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

export default observer(ShowCurrentThumbnail)
