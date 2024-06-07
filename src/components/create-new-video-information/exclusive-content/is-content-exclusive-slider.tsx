import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Slider from "../../slider"
import AddAnotherTierButton from "./add-another-tier-button"
import { useCreatorContext } from "../../../contexts/creator-context"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

function IsContentExclusiveSlider() {
	const creatorClass = useCreatorContext()
	const isNewVideoLoading = useIsNewVideoLoading()

	const isContentExclusive = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.newVideoDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	const updateNewVideoDetails = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoDetails("isContentExclusive", !creatorClass.newVideoDetails.isContentExclusive)
	}, [creatorClass])

	return (
		<div>
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
		</div>
	)
}

export default observer(IsContentExclusiveSlider)
