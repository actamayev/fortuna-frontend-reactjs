import _ from "lodash"
import { useCallback, useMemo } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import { useCreatorContext } from "../../../contexts/creator-context"

function AddAnotherTierButton() {
	const creatorClass = useCreatorContext()

	const addAnotherTierButton = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.addVideoTier()
	}, [creatorClass])

	const numberOfTiers = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData.length
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData.length])

	const isContentExclusive = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.newVideoDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	if (numberOfTiers === 3 || isContentExclusive === false) return null

	return (
		<Button
			title="Add Another Tier"
			colorClass="bg-blue-500 dark:bg-blue-400"
			hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
			onClick={addAnotherTierButton}
			className="text-white dark:text-zinc-950 font-medium"
		/>
	)
}

export default observer(AddAnotherTierButton)
