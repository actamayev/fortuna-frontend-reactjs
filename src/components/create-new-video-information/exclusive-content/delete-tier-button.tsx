import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function DeleteTierButton(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const deleteTier = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.deleteTier(tierNumber)
	}, [creatorClass, tierNumber])

	if (tierNumber === 1) return null

	return (
		<Button
			title="Delete this tier"
			colorClass="bg-red-500 dark:bg-red-400"
			hoverClass="hover:bg-red-600 dark:hover:bg-red-500"
			onClick={deleteTier}
			className="text-white dark:text-zinc-950 font-medium"
		/>
	)
}

export default observer(DeleteTierButton)
