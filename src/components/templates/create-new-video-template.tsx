interface Props {
	children: React.ReactNode
}

export default function CreateNewVideoTemplate(props: Props) {
	const { children } = props

	return (
		<div className="flex justify-center">
			<div className="bg-white dark:bg-zinc-800 rounded-md p-6 w-11/12 mx-auto border border-zinc-100 dark:border-zinc-700">
				<h1 className="flex mx-auto mb-4 text-5xl font-extrabold leading-none tracking-tight text-zinc-950 dark:text-zinc-200">
					Create Content
				</h1>
				{children}
			</div>
		</div>
	)
}
