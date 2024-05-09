/* eslint-disable max-len */
import _ from "lodash"
import { useState } from "react"

interface Props {
	sharesRemainingForSale: number
	totalShares: number
}

export default function SharesAvailableProgressBar(props: Props) {
	const { sharesRemainingForSale, totalShares } = props
	const [showTooltip, setShowTooltip] = useState(false)

	const percent = _.round((sharesRemainingForSale / totalShares) * 100)

	return (
		<div
			className="w-full bg-gray-400 rounded-full h-1.5 dark:bg-gray-700 relative"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<div
				className="bg-blue-600 h-1.5 rounded-full transition-all duration-100"
				style={{ width: `${percent}%` }}
			></div>
			<div
				className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg transition-opacity duration-250 ${showTooltip ? "opacity-100 visible" : "opacity-0 invisible"}`}
				style={{ transition: "opacity 0.1s ease-in-out" }}
			>
				{`${percent.toFixed(1)}% sold`}
			</div>
		</div>
	)
}
