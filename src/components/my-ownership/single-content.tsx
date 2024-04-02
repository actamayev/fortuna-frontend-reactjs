import _ from "lodash"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import Button from "../button"
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
					{/* Dr. {_.upperFirst(firstName || "")} {_.upperFirst(lastName || "")} */}
				</h2>
				{/* <Link
					to={`/vet/${}`}
					className="text-white inline-block"
				>
					<Button
						colorClass="bg-orange-200"
						hoverClass="hover:bg-orange-300"
						className="font-bold py-2 px-4 rounded inline-block w-full"
						title={`Click Me! NVI: ${nvi}`}
						textColor="text-black"
					/>
				</Link> */}
			</div>
		</div>
	)
}

export default observer(SingleContent)
