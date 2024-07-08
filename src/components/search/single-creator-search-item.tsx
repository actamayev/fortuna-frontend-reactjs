import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"

interface Props {
	creatorData: CreatorData
}

function SingleCreatorSearchItem(props: Props) {
	const { creatorData } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()
	const defaultSiteTheme = useDefaultSiteTheme()

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorData.creatorUsername))
	}, [creatorData.creatorUsername, navigateToCreatorPage])

	return (
		<div
			className="flex items-center space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={navigateToCreatorPageCallback}
		>
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
			<div className="flex-grow text-lg text-center dark:text-zinc-200">
				{creatorData.channelName}
			</div>
		</div>
	)
}

export default observer(SingleCreatorSearchItem)
