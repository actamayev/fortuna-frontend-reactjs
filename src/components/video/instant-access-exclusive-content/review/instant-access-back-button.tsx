import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../../button"
import { useMarketContext } from "../../../../contexts/market-context"

function InstantAccessBackButton() {
	const marketClass = useMarketContext()

	const setInstantAccessToExclusiveContentStage = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("initial")
	} ,[marketClass])

	return (
		<Button
			title="<"
			colorClass="bg-blue-200 dark:bg-blue-600"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-700"
			onClick={setInstantAccessToExclusiveContentStage}
			className="font-semibold"
		/>
	)
}

export default observer(InstantAccessBackButton)
