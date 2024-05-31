import FooterSocialSection from "./footer-social-section"
import FooterSupportSection from "./footer-support-section"
import FooterCompanySection from "./footer-company-section"

export default function Footer() {
	return (
		<footer className="bg-blue-600 dark:bg-gray-950 border-yellow-400 border-t-2 rounded-t-md w-full py-8">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<FooterCompanySection />
					<FooterSupportSection />
					<FooterSocialSection />
				</div>
				<hr className="flex-grow border-t mt-4 border-gray-300" />
				<div className="text-center text-gray-100 mt-8 font-semibold">
					<p>&copy; 2024 Fortuna</p>
				</div>
			</div>
		</footer>
	)
}
