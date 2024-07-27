import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Slider from "../../sliders/slider"
import AddAnotherTierButton from "./add-another-tier-button"
import { useCreatorContext } from "../../../contexts/creator-context"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

function IsContentExclusiveSlider() {
	const creatorClass = useCreatorContext()
	const isNewVideoLoading = useIsNewVideoLoading()

	const isContentExclusive = useMemo(() => {
		return creatorClass.newVideoDetails.isContentExclusive
	}, [creatorClass.newVideoDetails.isContentExclusive])

	const updateNewVideoDetails = useCallback(() => {
		creatorClass.updateNewVideoDetails("isContentExclusive", !creatorClass.newVideoDetails.isContentExclusive)
	}, [creatorClass])

	return (
		<div className="flex flex-row items-center space-x-2">
			<span>Exclusive Content</span>
			<Slider
				checkedCondition={isContentExclusive === true}
				onChangeCheckedCondition={updateNewVideoDetails}
				disabledCondition={isNewVideoLoading}
				colorChangeOnToggle={true}
			/>
			<AddAnotherTierButton />
		</div>
	)
}

export default observer(IsContentExclusiveSlider)
