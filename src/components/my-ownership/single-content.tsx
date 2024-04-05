import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"

interface Props {
	mintAddress: string
}

function SingleContent(props: Props) {
	const { mintAddress } = props
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	const myContent = solanaClass.contextForMyContent(mintAddress)

	if (_.isUndefined(myContent)) return <>Content not found</>

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2">
					{myContent.splName}
					<img src={myContent.imageUrl} />
				</h2>
			</div>
		</div>
	)
}

export default observer(SingleContent)
