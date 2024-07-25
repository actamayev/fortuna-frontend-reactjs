interface Props {
	dollars: string
	cents: string
	extraStyles?: string
}

export function SuperMoneyStyleDollars(props: Props) {
	const { dollars, cents, extraStyles } = props

	return (
		<span className={`inline-flex items-baseline ${extraStyles}`}>
			${dollars}
			<span className="self-center mt-[-0.25em]" style={{ fontSize: "0.8em" }}>
				.{cents}
			</span>
		</span>
	)
}

export function SuperMoneyStyleSol(props: Props) {
	const { dollars, cents, extraStyles } = props

	return (
		<span className={`inline-flex items-baseline ${extraStyles}`}>
			{dollars}
			<span className="self-center mt-[-0.25em]" style={{ fontSize: "0.8em" }}>
				.{cents}
			</span>
			&nbsp;SOL
		</span>
	)
}
