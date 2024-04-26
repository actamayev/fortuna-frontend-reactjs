import LogoHeaderSection from "./header/logo-header-section"
import LoginLogoutHeaderItem from "./header/login-logout-header-item"
import SliderDropdown from "./header/slider-dropdown/slider-dropdown"
import CreateContentHeaderButton from "./header/create-content-header-button"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props

	return (
		<div className="flex flex-col min-h-screen">
			<nav className="bg-blue-600 dark:bg-gray-950 border-yellow-200 border-b-2">
				<div className="flex justify-between h-16">
					<LogoHeaderSection />
					<div className="flex items-center">
						<CreateContentHeaderButton />
						<SliderDropdown />
						<LoginLogoutHeaderItem />
					</div>
				</div>
			</nav>
			<div className="flex-1 w-full dark:bg-gray-950 bg-white overflow-y-auto px-10 py-8">
				{children}
			</div>
		</div>
	)
}
