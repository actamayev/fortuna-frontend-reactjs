import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLNameInput() {
	const solanaClass = useSolanaContext()

	const splDetailsName = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.newSplDetails.splName
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.splName])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("splName", event.target.value)
	}, [solanaClass])

	return (
		<FormGroup
			label = "Token Name"
			type = "text"
			placeholder = "Charlie bit my finger"
			onChange = {updateNewSplDetails}
			required
			value = {splDetailsName}
		/>
	)
}

export default observer(SPLNameInput)
