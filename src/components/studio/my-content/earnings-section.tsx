import { observer } from "mobx-react"

interface Props {
	content: MyContent
}

function EarningsSection(props: Props) {
	const { content } = props

	if (content.isContentExclusive === false) {
		return (
			<div>
				N/A: Content is not exclusive
			</div>
		)
	}

	return (
		<div>
			Coming soon...
		</div>
	)
}

export default observer(EarningsSection)
