interface Props {
	dollars: string
	cents: string
}

export function SuperMoneyStyleDollars(props: Props) {
	const { dollars, cents } = props

	return (
		<span className="inline-flex items-baseline">
			${dollars}
			<span className="self-center mt-[-0.25em]" style={{ fontSize: "0.8em" }}>
				.{cents}
			</span>
		</span>
	)
}

export function SuperMoneyStyleSol(props: Props) {
	const { dollars, cents } = props

	return (
		<span className="inline-flex items-baseline">
			{dollars}
			<span className="self-center mt-[-0.25em]" style={{ fontSize: "0.8em" }}>
				.{cents} SOL
			</span>
		</span>
	)
}
