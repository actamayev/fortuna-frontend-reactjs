import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaPlusCircle } from "react-icons/fa"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"

function AddAnotherTierButton() {
	const creatorClass = useCreatorContext()

	const addAnotherTierButton = useCallback(() => {
		creatorClass.addVideoTier()
	}, [creatorClass])

	const numberOfTiers = useMemo(() => {
		return creatorClass.newVideoDetails.tierData.length
	}, [creatorClass.newVideoDetails.tierData.length])

	const isContentExclusive = useMemo(() => {
		return creatorClass.newVideoDetails.isContentExclusive
	}, [creatorClass.newVideoDetails.isContentExclusive])

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
