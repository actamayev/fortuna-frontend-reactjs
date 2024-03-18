interface Props {
	title: string
	children: React.ReactNode
	width?: string
}

export default function AuthTemplate(props: Props) {
	const { title, children, width } = props

	return (
		<div className = "flex justify-center">
			<div className = {`mt-5 bg-white border shadow rounded-lg p-6 w-4/12 mx-auto ${width}`}>
				<h1
					className = "flex mx-auto mb-4 text-5xl font-extrabold \
						leading-none tracking-tight text-black"
				>
					{title}
				</h1>
				{children}
			</div>
		</div>
	)
}
