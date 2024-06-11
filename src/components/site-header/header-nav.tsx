import SearchBar from "./search-bar"
import SolOrUsdSlider from "./sol-or-usd-slider"
import ChooseSiteTheme from "../choose-site-theme"
import LogoHeaderSection from "./logo-header-section"
import LoginLogoutHeaderItem from "./login-logout-header-item"
import CreateContentHeaderButton from "./create-content-header-button"

export default function HeaderNav() {
	return (
		<nav className="bg-white dark:bg-neutral-900 fixed top-0 left-0 w-full z-20 border-b border-zinc-100 dark:border-zinc-700">
			<div className="flex justify-between items-center w-full px-2 relative h-14">
				<LogoHeaderSection />
				<div className="absolute left-0 right-0 mx-auto w-full max-w-none">
					<SearchBar />
				</div>
				<div className="flex items-center z-10">
					<CreateContentHeaderButton />
					<SolOrUsdSlider />
					<ChooseSiteTheme />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}
