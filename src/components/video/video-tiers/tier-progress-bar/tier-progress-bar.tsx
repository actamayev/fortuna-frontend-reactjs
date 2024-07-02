/* eslint-disable max-len */
import _ from "lodash"
import { observer } from "mobx-react"
import TierNumberSnowball from "./tier-number-snowball"

interface Props {
	isActive: boolean
	tier: TierDataFromDB
	numberOfPurchasesInThisTierSoFar: number | null
}

function getProgressColor(tierNumber: number): string {
	if (tierNumber === 1) return "rgb(220 38 38)"
	if (tierNumber === 2) return "rgb(22 163 74)"
	return "rgb(37 99 235)"
}

function getTextInProgressBar(tier: TierDataFromDB, numberOfPurchasesInThisTierSoFar: number | null): string | null {
	if (_.isNull(tier.purchasesInThisTier) || _.isNull(numberOfPurchasesInThisTierSoFar)) {
		return "No purchase limit"
	} else if (tier.isTierSoldOut === true) {
		return "Tier sold out"
	}
	return null
}

function calculateProgress(tier: TierDataFromDB, numberOfPurchasesInThisTierSoFar: number | null): number {
	if (
		!_.isNull(tier.purchasesInThisTier) &&
		!_.isNull(numberOfPurchasesInThisTierSoFar) &&
		tier.isTierSoldOut !== true &&
		numberOfPurchasesInThisTierSoFar !== tier.purchasesInThisTier
	) {
		return (100 * numberOfPurchasesInThisTierSoFar) / tier.purchasesInThisTier
	}
	return 100
}

function TierProgressBar (props: Props) {
	const { isActive, tier, numberOfPurchasesInThisTierSoFar } = props

	const progressColor = getProgressColor(tier.tierNumber)
	const textInProgressBar = getTextInProgressBar(tier, numberOfPurchasesInThisTierSoFar)
	const progress = calculateProgress(tier, numberOfPurchasesInThisTierSoFar)

	const containerWidth = isActive ||
		_.isNull(numberOfPurchasesInThisTierSoFar) ||
		_.isNull(tier.purchasesInThisTier) ||
		numberOfPurchasesInThisTierSoFar === tier.purchasesInThisTier
		? "100%"
		: "88px"  // Set a fixed width in pixels

	return (
		<div className="flex items-center space-x-2 relative mb-4">
			<TierNumberSnowball isActive={isActive} tier={tier} />
			<div
				className="flex items-center w-full h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full border border-black dark:border-zinc-300 overflow-hidden"
				style={{ width: containerWidth }}
			>
				<div className="bg-zinc-200 dark:bg-zinc-700 h-full flex items-center justify-center ml-4 mr-2 w-8">
					<span className="text-black dark:text-white font-extrabold" style={{ fontSize: "1vw" }}>
						${tier.tierAccessPriceUsd}
					</span>
				</div>
				<div
					className="h-full flex items-center pr-2 rounded-full border-r-0 border border-black dark:border-zinc-300"
					style={{
						width: `${progress}%`,
						minWidth: progress === 0 ? "30px" : undefined,
						minHeight: "30px",
						backgroundColor: progressColor
					}}
				>
					{textInProgressBar ? (
						<div className="flex-1 flex justify-center">
							<span className="text-white font-medium" style={{ fontSize: "1vw" }}>
								{textInProgressBar}
							</span>
						</div>
					) : (
						<span className="text-white font-medium ml-auto text-xs" style={{ fontSize: "1vw" }}>
							{progress.toFixed(0)}%
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(TierProgressBar)
