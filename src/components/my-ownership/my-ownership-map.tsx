import _ from "lodash"
import { observer } from "mobx-react"
import SingleOwnership from "./single-ownership"
import { useSolanaContext } from "../../contexts/solana-context"

function MyOwnershipMap() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (solanaClass.isRetrievingOwnership === true || solanaClass.hasOwnershipToRetrieve === true) {
		return <>Retrieving Ownership...</>
	} else if (_.isEmpty(solanaClass.myOwnershipMap)) {
		return <>No ownership</>
	}

	const ownershipKeys = Array.from(solanaClass.myOwnershipMap.keys())

	return (
		<div
			className = "card-container"
			style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}
		>
			{ownershipKeys.map((item) => {
				return <SingleOwnership key={item} mintAddress={item} />
			})}
		</div>
	)
}

export default observer(MyOwnershipMap)
