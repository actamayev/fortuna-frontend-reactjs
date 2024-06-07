import Tooltip from "../../tooltip"
import MaxProfitFromVideo from "./max-profit-from-video"

// TODO: Later on, add tier information here (in a clear and simple way)
// Add a section which shows the creator's max profit for each tier, and if the lowest tier has a defined limit, show the profit
// consider having an input, where, if the creator enters a number, it displays the profit (based off the tier system)
export default function NewVideoSummary() {
	return (
		<div className = "bg-white dark:bg-zinc-800 border rounded-lg w-full dark:border-b-2 p-2">
			<h1 className = "flex text-xl text-center font-semibold leading-none tracking-tight mb-3">
				Video Summary
			</h1>
			<div className="flex">
				Pegging to USD
				<div className="ml-2">
					<Tooltip
						message="The USD value of accessing this video will not change with Solana's price fluctuations"
						width="275px"
						messageStart="center"
					>
					ℹ️
					</Tooltip>
				</div>
			</div>
			<div>
				<MaxProfitFromVideo />
			</div>
		</div>
	)
}
