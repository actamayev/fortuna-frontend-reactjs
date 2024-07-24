interface Props {
	categoryName: string
}

export default function TransactionSummaryCardCategoryHeader(props: Props) {
	const { categoryName } = props

	return (
		<div className="font-semibold text-base">{categoryName}:&nbsp;</div>
	)
}
