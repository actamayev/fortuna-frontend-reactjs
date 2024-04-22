import _ from "lodash"
import { observer } from "mobx-react"
import SingleOwnership from "./single-ownership"
import { useSolanaContext } from "../../contexts/solana-context"

function MyOwnershipMap() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (solanaClass.isRetrievingOwnership === true || solanaClass.hasOwnershipToRetrieve === true) {
		return <>Retrieving Ownership...</>
	} else if (_.isEmpty(solanaClass.myOwnership)) {
		return <>No ownership</>
	}

	return (
		<div className="grid grid-cols-4">
			{solanaClass.myOwnership.map((item) => {
				return <SingleOwnership key={item.splPublicKey} ownership={item} />
			})}
		</div>
	)
}

export default observer(MyOwnershipMap)
