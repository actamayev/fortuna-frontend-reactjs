import SearchBar from "./search-bar"
import LogoHeaderSection from "./logo-header-section"
import SliderDropdown from "./slider-dropdown/slider-dropdown"
import LoginLogoutHeaderItem from "./login-logout-header-item"
import CreateContentHeaderButton from "./create-content-header-button"

export default function HeaderNav() {
	return (
		<nav className="bg-blue-600 dark:bg-gray-950 border-yellow-400 border-b-2 rounded-b-md fixed top-0 left-0 w-full z-20">
			<div className="flex justify-between items-center h-14 w-full pr-2 relative">
				<LogoHeaderSection />
				<div className="absolute left-0 right-0 mx-auto w-full max-w-none">
					<SearchBar />
				</div>
				<div className="flex items-center z-10">
					<CreateContentHeaderButton />
					<SliderDropdown />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}
