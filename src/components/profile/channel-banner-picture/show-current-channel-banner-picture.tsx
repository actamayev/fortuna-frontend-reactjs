import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentChannelBannerPicture(props: Props) {
	const { handleImageChange, fileInputRef, handleMouseEnter, handleMouseLeave, imageStyle, editPictureCallback } = props
	const creatorClass = useCreatorContext()

	const channelBannerPictureUrl = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.channelBannerUrl || ""
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.channelBannerUrl])

	return (
		<div className="relative inline-block w-full">
			{channelBannerPictureUrl ? (
				<img
					src={channelBannerPictureUrl}
					className="object-cover cursor-pointer w-full h-44 rounded-md"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			) : (
				<img
					src="/sand_picture.jpg"
					className="object-cover cursor-pointer w-full h-44 rounded-md"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			)}
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/jpeg, image/png"
				style={{ display: "none" }}
			/>
		</div>
	)
}

export default observer(ShowCurrentChannelBannerPicture)
