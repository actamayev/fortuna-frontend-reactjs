import IsContentExclusiveSlider from "./is-content-exclusive-slider"
import ChooseExclusiveContentTiers from "./choose-exclusive-content-tiers"

export default function ExclusiveContentOptionsSection() {
	return (
		<>
			<div className="mb-4">
				<IsContentExclusiveSlider/>
			</div>
			<div className="mb-4">
				<ChooseExclusiveContentTiers />
			</div>
		</>
	)
}
