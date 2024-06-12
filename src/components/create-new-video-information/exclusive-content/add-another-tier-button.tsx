import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaPlusCircle } from "react-icons/fa"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"

function AddAnotherTierButton() {
	const creatorClass = useCreatorContext()

	const addAnotherTierButton = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.addVideoTier()
	}, [creatorClass])

	const numberOfTiers = useMemo(() => {
		if (_.isNull(creatorClass)) return null
		return creatorClass.newVideoDetails.tierData.length
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData.length])

	const isContentExclusive = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.newVideoDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	if (_.isNull(numberOfTiers) || numberOfTiers === 3 || isContentExclusive === false) return null

	return (
		<Button
			title="Add Another Tier"
			titleIcon={<FaPlusCircle size={20}/>}
			colorClass="bg-blue-500 dark:bg-blue-400"
			hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
			onClick={addAnotherTierButton}
			className="text-white dark:text-zinc-950 font-semibold"
		/>
	)
}

export default observer(AddAnotherTierButton)
