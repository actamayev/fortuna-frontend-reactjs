import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"

interface Props {
	tierNumber: number
	tierAccessPrice: number
}

export default function PreviousTierMustSellOut(props: Props) {
	const { tierNumber, tierAccessPrice } = props

	return (
		<div className="border">
			<div>Tier {tierNumber}</div>
			<div>Tier {tierNumber - 1} must sell out before tier {tierNumber} is accessed</div>
			<div>
				Access Price: <ShowUsdOrSolPrice usdAmount={tierAccessPrice} />
			</div>
		</div>
	)
}
