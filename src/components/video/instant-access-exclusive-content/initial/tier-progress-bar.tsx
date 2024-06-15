import _ from "lodash"
import { observer } from "mobx-react"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface Props {
	isActive: boolean
	tier: TierDataFromDB
	numberOfPurchasesInThisTierSoFar: number | null
}

// eslint-disable-next-line complexity
function TierProgressBar(props: Props) {
	const { isActive, tier, numberOfPurchasesInThisTierSoFar } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	let progressColor
	if (tier.tierNumber === 1) progressColor =  "rgb(220 38 38)"
	else if (tier.tierNumber === 2) progressColor = "rgb(22 163 74)"
	else progressColor = "rgb(37 99 235)"

	let textInProgressBar
	if (_.isNull(tier.purchasesInThisTier) || _.isNull(numberOfPurchasesInThisTierSoFar)) {
		textInProgressBar = "Tier has not limit"
	} else if (tier.isTierSoldOut === true) {
		textInProgressBar = "Tier sold out"
	}

	let progress = 100
	if (
		!_.isNull(tier.purchasesInThisTier) &&
		!_.isNull(numberOfPurchasesInThisTierSoFar) &&
		tier.isTierSoldOut !== true &&
		numberOfPurchasesInThisTierSoFar !== tier.purchasesInThisTier
	) {
		progress = numberOfPurchasesInThisTierSoFar / tier.purchasesInThisTier
	}

	const containerWidth = isActive ||
		_.isNull(numberOfPurchasesInThisTierSoFar) ||
		numberOfPurchasesInThisTierSoFar === tier.purchasesInThisTier
		? "100%"
		: "32.5%"

	return (
		<div className="flex items-center space-x-2 relative mb-4">
			<div
				className="absolute -top-2.5 left-0 font-bold rounded-full \
					w-6 h-6 border border-black dark:border-white flex items-center justify-center text-md bg-zinc-200 dark:bg-zinc-700"
				style={{
					backgroundColor: isActive ? "rgb(250, 255, 0)" : "",
					color: (defaultSiteTheme === "dark" && isActive === false) ? "white" : "black"
				}}
			>
				{tier.tierNumber}
			</div>
			<div
				className="flex items-center w-full h-8 bg-zinc-200 dark:bg-zinc-700 \
				rounded-full border border-black dark:border-zinc-300 overflow-hidden"
				style={{ width : containerWidth }}
			>
				<div className="bg-zinc-200 dark:bg-zinc-700 h-full flex items-center justify-center ml-4 mr-2 w-8">
					<span className="text-black dark:text-white font-black">
						${tier.tierAccessPriceUsd}
					</span>
				</div>
				<div
					className="h-full flex items-center pr-2 rounded-full border-r-0 border border-black dark:border-zinc-300"
					style={{
						width: `${progress}%`,
						minWidth: "30px",
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
						<span className="text-white font-medium ml-1 text-xs">{progress.toFixed(0)}%</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(TierProgressBar)
