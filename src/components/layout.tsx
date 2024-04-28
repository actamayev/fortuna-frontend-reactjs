import HeaderNav from "./header/header-nav"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props

	return (
		<div className="flex flex-col min-h-screen">
			<HeaderNav />
			<div className="flex-1 w-full dark:bg-gray-950 bg-white overflow-y-auto px-10 py-8">
				{children}
			</div>
		</div>
	)
}
