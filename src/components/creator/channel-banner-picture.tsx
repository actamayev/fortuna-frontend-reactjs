import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function ChannelBannerPicture(props: Props) {
	const { creatorData } = props

	if (_.isNull(creatorData.channelBannerPictureUrl)) return null

	return (
		<div className="relative inline-block w-full">
			<img
				src={creatorData.channelBannerPictureUrl}
				className="object-cover w-full h-44 rounded"
			/>
		</div>
	)
}

export default observer(ChannelBannerPicture)
