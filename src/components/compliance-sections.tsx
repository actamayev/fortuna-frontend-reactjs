interface HeaderProps {
	headerTitle: string
	children?: React.ReactNode
}

export function ComplianceHeaderOneList( { children }: { children: React.ReactNode }) {
	return (
		<ol className="list-decimal pl-6">
			{children}
		</ol>
	)
}

export function ComplianceHeaderOne(props: HeaderProps) {
	const { headerTitle, children } = props

	return (
		<li>
			<div className="text-xl font-bold mb-2">
				{headerTitle}
			</div>
			{children}
		</li>
	)
}

export function ComplianceHeaderTwoList( { children }: { children: React.ReactNode }) {
	return (
		<ol className="list-lower-alpha pl-6">
			{children}
		</ol>
	)
}

export function ComplianceHeaderTwo(props: HeaderProps) {
	const { headerTitle, children } = props

	return (
		<li>
			<div className="text-lg font-bold mb-1">
				{headerTitle}
			</div>
			{children}
		</li>
	)
}

export function ComplianceTextList( { children }: { children: React.ReactNode }) {
	return (
		<ol className="list-roman pl-6">
			{children}
		</ol>
	)
}

export function ComplianceText(props: HeaderProps) {
	const { headerTitle, children } = props

	return (
		<li>
			<div className="font-semibold">
				{headerTitle}
			</div>
			<div className="font-normal">
				{children}
			</div>
		</li>
	)
}
