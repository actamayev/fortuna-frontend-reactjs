import _ from "lodash"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function CreatorProfilePicture(props: Props) {
	const { creatorData } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div style={{ minWidth: "128px", maxWidth: "128px" }}>
			{_.isNull(creatorData.creatorProfilePictureUrl) ? (
				<FaUserCircle
					color={defaultSiteTheme === "dark" ? "white" : "black"}
					className="w-32 h-32 rounded-full object-cover"
				/>
			) : (
				<img
					src={creatorData.creatorProfilePictureUrl}
					alt={`Profile of ${creatorData.channelName}`}
					className="w-32 h-32 rounded-full object-cover"
				/>
			)}
		</div>
	)
}

export default observer(CreatorProfilePicture)
