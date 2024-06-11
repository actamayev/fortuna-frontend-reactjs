import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"

interface Props {
	tierNumber: number
	tierData: TierDataFromDB
}

export default function TierSoldOut(props: Props) {
	const { tierNumber, tierData } = props

	return (
		<div className="border">
			<div>Tier {tierNumber}</div>
			<div>Soldout</div>
			<div>
				Access Price: <ShowUsdOrSolPrice usdAmount={tierData.tierAccessPriceUsd} />
			</div>
			<div>0/{tierData.purchasesInThisTier} Available in this tier</div>
		</div>
	)
}
