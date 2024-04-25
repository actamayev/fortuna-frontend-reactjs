interface Props {
	children: React.ReactNode
}

export default function UploadContentTemplate(props: Props) {
	const { children } = props

	return (
		<div className = "flex justify-center">
			<div className = "bg-white border shadow rounded-lg p-6 w-8/12 mx-auto dark:border-b-2 dark:border-yellow-400">
				{children}
			</div>
		</div>
	)
}
