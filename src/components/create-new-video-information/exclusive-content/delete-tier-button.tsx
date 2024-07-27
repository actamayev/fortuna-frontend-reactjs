import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaTrash } from "react-icons/fa"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function DeleteTierButton(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const deleteTier = useCallback(() => {
		creatorClass.deleteTier(tierNumber)
	}, [creatorClass, tierNumber])

	if (tierNumber === 1) return null

	return (
		<Button
			titleIcon={<FaTrash />}
			colorClass="bg-red-500 dark:bg-red-600"
			hoverClass="hover:bg-red-600 dark:hover:bg-red-700"
			onClick={deleteTier}
			className="text-white dark:text-black"
		/>
	)
}

export default observer(DeleteTierButton)
