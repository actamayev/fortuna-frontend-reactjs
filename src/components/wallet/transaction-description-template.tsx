interface Props {
	solanaTransaction: SolanaTransaction
}

export default function TransactionDescriptionTemplate(props: Props) {
	const { solanaTransaction } = props

	return (
		<span>
			Instant transfer&nbsp;
			{solanaTransaction.depositOrWithdrawal === "deposit" && (<>from @{solanaTransaction.transferFromUsername}</>)}
			{solanaTransaction.depositOrWithdrawal === "withdrawal" && (
				<>
							to {solanaTransaction.transferToUsername && <>@</>}
					{solanaTransaction.transferToUsername || solanaTransaction.transferToPublicKey}
				</>
			)}
		</span>
	)
}
