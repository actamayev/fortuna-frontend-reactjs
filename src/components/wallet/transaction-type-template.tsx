import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"

interface Props {
	depositOrWithdrawal: DepositOrWithDrawal
}

export default function TransactionTypeTemplate(props: Props) {
	const { depositOrWithdrawal } = props

	if (depositOrWithdrawal === "withdrawal") {
		return (
			<div className="flex flex-row items-center space-x-3">
				<BsArrowUpRightSquareFill size={30} className="flex-shrink-0 text-zinc-950 dark:text-zinc-200"/>
				<div>Withdrawal</div>
			</div>
		)
	}

	return (
		<div className="flex flex-row items-center space-x-3 text-green-600 dark:text-green-400">
			<BsArrowDownLeftSquareFill size={30} className="flex-shrink-0"/>
			<div>Deposit</div>
		</div>
	)
}
