import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function CreatorProfilePicture(props: Props) {
	const { creatorData } = props

	if (_.isNull(creatorData.creatorProfilePictureUrl)) return null

	return (
		<div style={{ minWidth: "128px", maxWidth: "128px" }}>
			<img
				src={creatorData.creatorProfilePictureUrl}
				alt={`Profile of ${creatorData.creatorUsername}`}
				className="w-32 h-32 rounded-full object-cover"
			/>
		</div>
	)
}

export default observer(CreatorProfilePicture)
