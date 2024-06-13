import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaTrash } from "react-icons/fa"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	tierNumber: number
}

function DeleteTierButton(props: Props) {
	const { tierNumber } = props
	const defaultSiteTheme = useDefaultSiteTheme()
	const creatorClass = useCreatorContext()

	const deleteTier = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.deleteTier(tierNumber)
	}, [creatorClass, tierNumber])

	if (tierNumber === 1) return null

	return (
		<Button
			titleIcon={<FaTrash color={defaultSiteTheme === "light" ? "white" : "black"}/>}
			colorClass="bg-red-500 dark:bg-red-600"
			hoverClass="hover:bg-red-600 dark:hover:bg-red-700"
			onClick={deleteTier}
		/>
	)
}

export default observer(DeleteTierButton)
