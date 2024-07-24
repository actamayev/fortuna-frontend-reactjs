interface Props {
	dollars: string
	cents: string
  }

export function SuperMoneyStyleDollars(props: Props) {
	const { dollars, cents } = props

	return (
		<span className="inline-flex items-baseline">
			${dollars}
			<span className="text-xs self-center mt-[-0.25em]">
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
			<span className="text-xs self-center mt-[-0.25em]">
				.{cents} SOL
			</span>
		</span>
	)
}
