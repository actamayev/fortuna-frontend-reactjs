import FooterLink from "./footer-link"
import FooterHeaderText from "./footer-header-text"

export default function FooterSupportSection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Support" />
			<FooterLink linkTo="/help-center" linkTitle="Help Center" />
			<FooterLink linkTo="/faq" linkTitle="FAQ" />
			<FooterLink linkTo="/privacy-policy" linkTitle="Privacy Policy" />
		</div>
	)
}
