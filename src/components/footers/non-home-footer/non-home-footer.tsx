import NonHomeFooterSocialSection from "./non-home-footer-social-section"
import NonHomeFooterSupportSection from "./non-home-footer-support-section"
import NonHomeFooterCompanySection from "./non-home-footer-company-section"

export default function NonHomeFooter() {
	return (
		<footer className="bg-zinc-100 dark:bg-zinc-800 w-full py-4">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<NonHomeFooterCompanySection />
					<NonHomeFooterSupportSection />
					<NonHomeFooterSocialSection />
				</div>
				<hr className="flex-grow border-zinc-300 my-4" />
				<div className="text-center text-zinc-950 dark:text-zinc-50 font-normal text-base">
					Fortuna Systems Inc
				</div>
			</div>
		</footer>
	)
}
