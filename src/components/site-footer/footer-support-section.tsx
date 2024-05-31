import FooterLink from "./footer-link"

export default function FooterSupportSection() {
	return (
		<div>
			<h4 className="text-zinc-900 text-md font-semibold mb-4">Support</h4>
			<FooterLink linkTo="/help-center" linkTitle="Help Center" />
			<FooterLink linkTo="/faq" linkTitle="FAQ" />
			<FooterLink linkTo="/privacy-policy" linkTitle="Privacy Policy" />
		</div>
	)
}
