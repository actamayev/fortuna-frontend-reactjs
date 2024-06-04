import FooterLink from "./footer-link"
import FooterHeaderText from "./footer-header-text"

export default function FooterCompanySection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Company" />
			<FooterLink linkTo="/about" linkTitle="About Us" />
			<FooterLink linkTo="/careers" linkTitle="Careers" />
			<FooterLink linkTo="/contact" linkTitle="Contact" />
		</div>
	)
}
