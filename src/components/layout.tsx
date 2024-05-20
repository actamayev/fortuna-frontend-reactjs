import HeaderNav from "./site-header/header-nav"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props

	return (
		<div className="min-h-screen dark:bg-gray-950">
			<div className="flex flex-col">
				<HeaderNav />
				<div className="flex-1 w-full overflow-y-auto px-10 py-8 mt-14">
					{children}
				</div>
			</div>
		</div>
	)
}
