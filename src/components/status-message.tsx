import _ from "lodash"

interface Props {
	status: string
}

export default function StatusMessage (props: Props) {
	const { status } = props

	if (_.isEmpty(status)) return null

	return (
		<div className = "mt-2 bg-blue-100 text-blue-700 px-4 py-3 rounded relative dark:bg-blue-900 dark:text-white">
			{status}
		</div>
	)
}
