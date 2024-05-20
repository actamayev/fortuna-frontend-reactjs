import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLDescriptionInput() {
	const solanaClass = useSolanaContext()

	const splDetailsDescription = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.newSplDetails.description
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.description])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("description", event.target.value)
	}, [solanaClass])

	return (
		<FormGroup
			label = "Token Description"
			type = "text"
			placeholder = "Charlie bit my finger really hard"
			onChange = {updateNewSplDetails}
			required
			value = {splDetailsDescription}
			multiline={true}
		/>
	)
}

export default observer(SPLDescriptionInput)
