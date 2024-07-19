import HomeFooterSocialSection from "./home-footer-social-section"
import HomeFooterSupportSection from "./home-footer-support-section"

export default function HomeFooter() {
	return (
		<footer className="bg-zinc-100 dark:bg-zinc-800 w-full py-3">
			<div className="flex justify-center w-full">
				<div className="flex flex-row w-full max-w-screen-xl justify-between">
					<div className="flex items-center">
						<HomeFooterSocialSection />
					</div>
					<div className="flex items-center text-zinc-950 dark:text-zinc-50 font-normal text-base">
						Fortuna Systems Inc
					</div>
					<div className="flex items-center">
						<HomeFooterSupportSection />
					</div>
				</div>
			</div>
		</footer>
	)
}
