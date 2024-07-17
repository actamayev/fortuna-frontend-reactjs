import _ from "lodash"
import { useObserver } from "mobx-react"
import { useMarketContext } from "../../contexts/market-context"
import getCurrentExclusiveAccessTier from "../../utils/video-access-tiers/get-current-exclusive-access-tier"
import useCheckIfUUIDExistsInExclusiveContentList from "../positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

export default function useClickTiersButton(
	video: UrlExtendedSingleVideoData | undefined
): () => void {
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video?.uuid)
	const currentExclusiveAccessTier = getCurrentExclusiveAccessTier(video)

	return useObserver(() => {
		if (
			_.isNull(marketClass) ||
			doesUserHaveAccessToExclusiveContent === true ||
			_.isNull(currentExclusiveAccessTier) ||
			_.isUndefined(video)
		) {
			return () => {}
		}

		return () => {
			const tier = video.tierData.find(singleTier => singleTier.tierNumber === currentExclusiveAccessTier)
			if (_.isUndefined(tier) || tier.isTierSoldOut) return

			marketClass.setInstantAccessToExclusiveContentStage("review")
		}
	})
}
