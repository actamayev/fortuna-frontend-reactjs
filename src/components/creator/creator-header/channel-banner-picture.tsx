import { observer } from "mobx-react"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function ChannelBannerPicture(props: Props) {
	const { creatorData } = props

	return (
		<div className="relative inline-block w-full">
			{creatorData.channelBannerPictureUrl ? (
				<img
					src={creatorData.channelBannerPictureUrl}
					className="object-cover w-full h-44 rounded"
				/>
			) : (
				<img
					src="/sand_picture.jpg"
					className="object-cover w-full h-44 rounded"
				/>
			)}
		</div>
	)
}

export default observer(ChannelBannerPicture)
