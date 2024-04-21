import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	mintAddress: string
}

function SingleOwnership(props: Props) {
	const { mintAddress } = props
	const solanaClass = useSolanaContext()
	const navigateToVideoPage = useNavigateToVideo()

	if (_.isNull(solanaClass)) return null
	const myOwnership = solanaClass.contextForMyOwnership(mintAddress)

	if (_.isUndefined(myOwnership)) return <>Content not found</>

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2">
					{myOwnership.splName}
					<img
						src={myOwnership.imageUrl}
						onClick={() => navigateToVideoPage(myOwnership.uuid)}
						className="hover:cursor-pointer"
					/>
				</h2>
				<p>Number of shares: {myOwnership.numberOfShares}</p>
			</div>
		</div>
	)
}

export default observer(SingleOwnership)
