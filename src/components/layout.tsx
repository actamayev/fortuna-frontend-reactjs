import CustomLink from "./custom-link"
import LoginLogoutHeaderItem from "./login-logout-header-item"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props

	return (
		<div>
			<nav className="bg-black">
				<div className="flex justify-between h-16">
					<div className="flex items-center ml-4">
						<CustomLink
							href="/"
							title="Fortuna"
							css = "text-gray-200 hover:text-white font-bold text-xl"
						/>
					</div>
					<div className="flex items-center mr-4">
						<LoginLogoutHeaderItem />
					</div>
				</div>
			</nav>
			<div className="flex flex-row">
				<div className="flex-1 w-full bg-white overflow-y-auto px-10 py-8">
					{children}
				</div>
			</div>
		</div>
	)
}
