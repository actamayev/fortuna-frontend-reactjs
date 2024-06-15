import _ from "lodash"

interface Props {
	isActive: boolean
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number | null
}

// eslint-disable-next-line complexity
export default function TierProgressBar(props: Props) {
	const { isActive, tier, numberOfExclusivePurchasesSoFar } = props

	let progressColor: string
	if (tier.tierNumber === 1) {
		progressColor =  "rgb(220 38 38)"
	} else if (tier.tierNumber === 2) {
		progressColor = "rgb(22 163 74)"
	} else {
		progressColor = "rgb(37 99 235)"
	}

	let textInProgressBar
	if (_.isNull(tier.purchasesInThisTier) || _.isNull(numberOfExclusivePurchasesSoFar)) {
		textInProgressBar = "Tier has not limit"
	} else if (tier.isTierSoldOut === true) {
		textInProgressBar = "Tier sold out"
	}

	let progress = "100%"
	if (
		!_.isNull(tier.purchasesInThisTier) &&
		!_.isNull(numberOfExclusivePurchasesSoFar) &&
		tier.isTierSoldOut !== true &&
		numberOfExclusivePurchasesSoFar !== tier.purchasesInThisTier
	) {
		progress = `${numberOfExclusivePurchasesSoFar / tier.purchasesInThisTier}%`
	}

	return (
		<div className="flex items-center space-x-2 relative mb-4">
			<div
				className="absolute -top-2.5 left-0 text-black dark:text-white font-bold rounded-full \
					w-6 h-6 border border-black dark:border-white flex items-center justify-center text-md bg-zinc-200 dark:bg-zinc-700"
				style={{
					backgroundColor: isActive ? "rgb(250, 255, 0)" : "",
					// color: isActive ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"
				}}
			>
				{tier.tierNumber}
			</div>
			<div className="flex items-center w-full h-8 bg-zinc-200 dark:bg-zinc-700 \
				rounded-full border border-black dark:border-zinc-300 overflow-hidden"
			>
				<div className="bg-zinc-200 dark:bg-zinc-700 h-full flex items-center justify-center ml-4 mr-2">
					<span className="text-black dark:text-white font-black">
						${tier.tierAccessPriceUsd}
					</span>
				</div>
				<div
					className="h-full flex items-center pr-2 rounded-full border-r-0 border border-black dark:border-zinc-300"
					style={{
						width: progress,
						minWidth: "11%",
						backgroundColor: progressColor
					}}
				>
					{textInProgressBar ? (
						<div className="flex-1 flex justify-center">
							<span className="text-white font-medium">
								{textInProgressBar}
							</span>
						</div>
					) : (
						<span className="text-white font-medium ml-auto">{progress}</span>
					)}
				</div>
			</div>
		</div>
	)
}
