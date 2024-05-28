import IsContentExclusiveSlider from "./is-content-exclusive-slider"
import IsContentInstantlyAccessible from "./is-content-instantly-accessible"
import ValueNeededToAccessExclusiveContent from "./value-needed-to-access-exclusive-content"
import InstantAccessPriceToExclusiveContentUsd from "./instant-access-price-to-exclusive-content-usd"
import AllowValueFromSameCreatorTokensForExclusiveContent from "./allow-value-from-same-creator-tokens-for-exclusive-content"

export default function ExclusiveContentOptionsSection() {
	return (
		<>
			<div className="mb-4">
				<IsContentExclusiveSlider/>
			</div>
			<div className="mb-4">
				<ValueNeededToAccessExclusiveContent />
			</div>
			<div className="mb-4">
				<AllowValueFromSameCreatorTokensForExclusiveContent />
			</div>
			<div className="mb-4">
				<IsContentInstantlyAccessible />
			</div>
			<div className="mb-4">
				<InstantAccessPriceToExclusiveContentUsd />
			</div>
		</>
	)
}
