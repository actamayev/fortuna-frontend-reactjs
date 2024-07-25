interface Props {
	solanaTransaction: SolanaTransaction
}

export default function TransactionDescriptionTemplate(props: Props) {
	const { solanaTransaction } = props

	return (
		<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
			Instant transfer&nbsp;
			{solanaTransaction.depositOrWithdrawal === "deposit" && (
				<div className="overflow-hidden text-ellipsis whitespace-nowrap">
					from @{solanaTransaction.transferFromUsername}
				</div>
			)}
			{solanaTransaction.depositOrWithdrawal === "withdrawal" && (
				<div className="overflow-hidden text-ellipsis whitespace-nowrap">
					to {solanaTransaction.transferToUsername && <>@</>}
					{solanaTransaction.transferToUsername || solanaTransaction.transferToPublicKey}
				</div>
			)}
		</div>
	)
}
