import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../../../../button"
import useSplTokenAsk from "../../../../../hooks/exchange/spl-token-ask"

function ConfirmAskButton() {
	const [isLoading, setIsLoading] = useState(false)
	const splTokenAsk = useSplTokenAsk()

	return (
		<Button
			onClick={() => splTokenAsk(setIsLoading)}
			colorClass="bg-emerald-200"
			hoverClass="hover:bg-emerald-300"
			title="Confirm Ask"
			disabled={isLoading}
			className="font-semibold dark:text-black"
		/>
	)
}

export default observer(ConfirmAskButton)
