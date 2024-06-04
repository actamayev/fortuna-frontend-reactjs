interface Props {
	headerTitle: string
}

export default function FooterHeaderText(props: Props) {
	const { headerTitle } = props

	return (
		<h4 className="tex-zinc-950 dark:text-zinc-200 text-md font-semibold mb-4">{headerTitle}</h4>
	)
}
