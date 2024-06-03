interface Props {
	title: string
	children: React.ReactNode
}

export default function AuthTemplate(props: Props) {
	const { title, children } = props

	return (
		<div className = "flex justify-center">
			<div className = "mt-5 bg-white border shadow rounded-lg p-6 w-4/12 mx-auto dark:border-b-2">
				<h1 className = "flex mx-auto mb-4 text-5xl font-extrabold leading-none tracking-tight text-zinc-900">
					{title}
				</h1>
				{children}
			</div>
		</div>
	)
}
