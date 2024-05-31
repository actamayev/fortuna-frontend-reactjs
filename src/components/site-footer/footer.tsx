import FooterSocialSection from "./footer-social-section"
import FooterSupportSection from "./footer-support-section"
import FooterCompanySection from "./footer-company-section"

export default function Footer() {
	return (
		<footer className="bg-zinc-100 dark:bg-gray-950 rounded-t-md w-full py-8">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<FooterCompanySection />
					<FooterSupportSection />
					<FooterSocialSection />
				</div>
				<hr className="flex-grow mt-4 border-zinc-300" />
				<div className="text-center text-zinc-600 mt-8 font-medium">
					<p>&copy; 2024 Fortuna</p>
				</div>
			</div>
		</footer>
	)
}
