interface Props {
	dollars: string
	cents: string
}

export function SuperMoneyStyleDollars(props: Props) {
	const { dollars, cents } = props

	return (
		<span style={{ display: "inline-flex", alignItems: "baseline" }}>
			${dollars}
			<span style={{ fontSize: "0.5em", alignSelf: "center", marginTop: "-0.25em" }}>
				.{cents}
			</span>
		</span>
	)
}

export function SuperMoneyStyleSol(props: Props) {
	const { dollars, cents } = props

	return (
		<span style={{ display: "inline-flex", alignItems: "baseline" }}>
			{dollars}
			<span style={{ fontSize: "0.5em", alignSelf: "center", marginTop: "-0.25em" }}>
				.{cents} SOL
			</span>
		</span>
	)
}
