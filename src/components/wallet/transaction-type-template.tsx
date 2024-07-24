import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"

interface Props {
	depositOrWithdrawal: DepositOrWithDrawal
	iconSize: number
	extraClasses?: string
	showIcon?: boolean
}

export default function TransactionTypeTemplate(props: Props) {
	const { depositOrWithdrawal, iconSize, extraClasses = "", showIcon } = props

	if (depositOrWithdrawal === "withdrawal") {
		return (
			<div className={`flex flex-row items-center text-zinc-950 dark:text-zinc-200 ${extraClasses}`}>
				{showIcon && (
					<BsArrowUpRightSquareFill size={iconSize} className="flex-shrink-0"/>
				)}
				<div>Withdrawal</div>
			</div>
		)
	}

	return (
		<div className={`flex flex-row items-center text-green-600 dark:text-green-400 ${extraClasses}`}>
			{showIcon && (
				<BsArrowDownLeftSquareFill size={iconSize} className="flex-shrink-0"/>
			)}
			<div>Deposit</div>
		</div>
	)
}
