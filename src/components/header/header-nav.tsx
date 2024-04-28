import SearchBar from "./search-bar"
import LogoHeaderSection from "./logo-header-section"
import SliderDropdown from "./slider-dropdown/slider-dropdown"
import LoginLogoutHeaderItem from "./login-logout-header-item"
import CreateContentHeaderButton from "./create-content-header-button"

export default function HeaderNav() {
	return (
		<nav className="bg-blue-600 dark:bg-gray-950 border-yellow-200 border-b-2">
			<div className="flex justify-between h-16">
				<LogoHeaderSection />
				<SearchBar />
				<div className="flex items-center">
					<CreateContentHeaderButton />
					<SliderDropdown />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}
