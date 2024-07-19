import HomeFooterCenterSection from "./home-footer-center-section"
import HomeFooterSocialSection from "./home-footer-social-section"
import HomeFooterSupportSection from "./home-footer-support-section"

export default function HomeFooter() {
	return (
		<footer className="bg-zinc-100 dark:bg-zinc-800 w-full py-4">
			<div className="max-w-screen-xl mx-auto py-2">
				<div className="grid grid-cols-5">
					<div className="col-span-1">
						<HomeFooterSocialSection />
					</div>
					<div className="col-span-3">
						<HomeFooterCenterSection />
					</div>
					<div className="col-span-1">
						<HomeFooterSupportSection />
					</div>
				</div>
			</div>
		</footer>
	)
}
