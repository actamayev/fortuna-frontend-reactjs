import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaSave, FaTimesCircle, FaTrash } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useRemoveCurrentChannelBannerPicture from "../../../../hooks/creator/remove-current-channel-banner-picture"

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
	const removeCurrentChannelBannerPicture = useRemoveCurrentChannelBannerPicture()
	const [isDeletingCurrentPicture, setIsDeletingCurrentPicture] = useState(false)

	const removeCurrentChannelBannerPictureCallback = useCallback(async () => {
		await removeCurrentChannelBannerPicture(setIsDeletingCurrentPicture)
	}, [removeCurrentChannelBannerPicture])

	const toggleIsDeletingPicture = useCallback(() => {
		setIsDeletingCurrentPicture(prevState => !prevState)
	}, [])

	return (
		<div className="relative inline-block w-full">
			{(creatorClass?.channelBannerUrl && isDeletingCurrentPicture === false) ? (
				<>
					<img
						src={creatorClass.channelBannerUrl}
						className="object-cover cursor-pointer w-full h-44 rounded"
						style={imageStyle}
						onClick={editPictureCallback}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
					<div
						className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
							cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
						onClick={toggleIsDeletingPicture}
					>
						<FaTrash color="white" size={22} />
					</div>
				</>
			) : (
				<>
					<img
						src="/sand_picture.jpg"
						className="object-cover cursor-pointer w-full h-44 rounded"
						style={imageStyle}
						onClick={editPictureCallback}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
					{!_.isNil(creatorClass?.channelBannerUrl) && (
						<>
							<div
								className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
									cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
								onClick={toggleIsDeletingPicture}
							>
								<FaTimesCircle color="white" size={22} />
							</div>
							<div
								className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
									cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
								onClick={removeCurrentChannelBannerPictureCallback}
							>
								<FaSave color="white" size={22} />
							</div>
						</>
					)}
				</>
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
