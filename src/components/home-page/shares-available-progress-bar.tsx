import _ from "lodash"
import { useState } from "react"

interface Props {
	sharesRemainingForSale: number
	totalShares: number
}

export default function SharesAvailableProgressBar(props: Props) {
	const { sharesRemainingForSale, totalShares } = props
	const [showTooltip, setShowTooltip] = useState(false)

	const percent = _.round((1 - (sharesRemainingForSale / totalShares)) * 100)

	let tooltipWidth = "130px"
	if (sharesRemainingForSale === 0) tooltipWidth = "65px"

	return (
		<div
			className="bg-gray-300 rounded-full h-1.5 dark:bg-gray-200 relative"
			style={{ width: "110px" }} // Set a fixed width for the progress bar container
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<div
				className="bg-blue-500 dark:bg-blue-500 h-1.5 rounded-full"
				style={{ width: `${percent}%` }}
			/>
			<div
				className={
					`absolute left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+40px)] mt-2 px-2 py-1 bg-zinc-900 \
                	text-white text-xs rounded shadow-lg transition-opacity \
					${showTooltip ? "opacity-100 visible" : "opacity-0 invisible"}`
				}
				style={{ transition: "opacity 0.1s ease-in-out", minWidth: tooltipWidth }}
			>
				{sharesRemainingForSale === 0 ? (
					<div>Sold out</div>
				) : (
					<>
						<div>{`${_.round(percent)}% sold`}</div>
						<div>{`${sharesRemainingForSale} share${sharesRemainingForSale === 1 ? "" : "s"} available`}</div>
					</>
				)}
			</div>
		</div>
	)
}
