import { FaArrowAltCircleDown } from "react-icons/fa"
import Tooltip from "../tooltip"
import Button from "../buttons/button"

export default function AddFundsButton() {
	return (
		<Tooltip
			message={
				<div>
					<p>1. Copy your Public Key (left)</p>
					<p>
						2. Go to&nbsp;
						<a
							href="https://faucet.solana.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline text-blue-500"
						>
							Solana Faucet
						</a>
							, paste your Public Key, select an Amount (ie. 5), and Confirm Airdrop
					</p>
					<p>3. Navigate back to Fortuna and refresh the page</p>
				</div>
			}
			width="500px"
		>
			<Button
				title="Add funds (free)"
				titleIcon={<FaArrowAltCircleDown />}
				colorClass="bg-green-600 dark:bg-green-400"
				hoverClass="hover:bg-green-700 dark:hover:bg-green-600"
				className="text-white dark:text-zinc-950 font-medium cursor-default"
				style={{ padding: "6px" }}
			/>
		</Tooltip>
	)
}
