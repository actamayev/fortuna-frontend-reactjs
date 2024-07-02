import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import OneTierTemplate from "../video-tiers/tiers-templates/one-tier-template"
import TwoTiersTemplate from "../video-tiers/tiers-templates/two-tiers-template"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"
import ThreeTiersTemplate from "../video-tiers/tiers-templates/three-tiers-template"
import getTierByTierNumber from "../../../utils/video-access-tiers/get-tier-by-tier-number"

interface Props {
	videoData: VideoDataLessVideoUrl
}

// eslint-disable-next-line complexity
function ShowNumberTiers(props: Props) {
	const { videoData } = props
	const firstTier = getTierByTierNumber(videoData.tierData, 1)
	const secondTier = getTierByTierNumber(videoData.tierData, 2)
	const thirdTier = getTierByTierNumber(videoData.tierData, 3)
	const navigate = useNavigateToVideoPage()

	const onClickButton = useCallback(() => {
		navigate(videoData.uuid)
	}, [navigate, videoData.uuid])

	if (_.isEmpty(videoData.tierData) || videoData.tierData.length > 3) return null

	if (videoData.tierData.length === 1) {
		if (_.isUndefined(firstTier)) return null

		return (
			<OneTierTemplate
				onClick={onClickButton}
				tier={firstTier}
				numberOfExclusivePurchasesSoFar={videoData.numberOfExclusivePurchasesSoFar || 0}
				doesUserHaveAccessToExclusiveContent={false}
				uuid={videoData.uuid}
			/>
		)
	} else if (videoData.tierData.length === 2) {
		if (_.isUndefined(firstTier) || _.isUndefined(secondTier)) return null

		return (
			<TwoTiersTemplate
				onClick={onClickButton}
				firstTier={firstTier}
				secondTier={secondTier}
				numberOfExclusivePurchasesSoFar={videoData.numberOfExclusivePurchasesSoFar || 0}
				doesUserHaveAccessToExclusiveContent={false}
				uuid={videoData.uuid}
			/>
		)
	} else if (videoData.tierData.length === 3) {
		if (_.isUndefined(firstTier) || _.isUndefined(secondTier) || _.isUndefined(thirdTier)) return null

		return (
			<ThreeTiersTemplate
				onClick={onClickButton}
				firstTier={firstTier}
				secondTier={secondTier}
				thirdTier={thirdTier}
				numberOfExclusivePurchasesSoFar={videoData.numberOfExclusivePurchasesSoFar || 0}
				doesUserHaveAccessToExclusiveContent={false}
				uuid={videoData.uuid}
			/>
		)
	}
}

export default observer(ShowNumberTiers)
