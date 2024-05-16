import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../../../button"
import useAskSecondarySplTokens from "../../../../../hooks/exchange/spl-token-ask"

function ConfirmAskButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const splTokenAsk = useAskSecondarySplTokens()

	if (_.isUndefined(videoUUID)) return null

	return (
		<div className="flex justify-center mt-2">
			<Button
				onClick={() => splTokenAsk(setIsLoading)}
				colorClass="bg-emerald-200"
				hoverClass="hover:bg-emerald-300"
				title="Confirm Ask"
				disabled={isLoading}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ConfirmAskButton)
