import SolOrUsdSlider from "./sliders/sol-or-usd-slider"
import SiteThemeSlider from "./sliders/site-theme-slider"
import LogoHeaderSection from "./header/logo-header-section"
import LoginLogoutHeaderItem from "./header/login-logout-header-item"

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
					<div className="flex items-center space-x-3">
						<div className="flex items-center space-x-3 mt-3">
							<SolOrUsdSlider />
							<SiteThemeSlider />
						</div>
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
