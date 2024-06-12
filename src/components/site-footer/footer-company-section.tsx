import FooterLink from "./footer-link"
import FooterHeaderText from "./footer-header-text"
import LinkToExternalSite from "./link-to-external-site"

export default function FooterCompanySection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Company" />
			<LinkToExternalSite
				title="About Us"
				link="https://help.mintfortuna.com"
			/>
			<FooterLink linkTo="/contact" linkTitle="Contact" />
		</div>
	)
}
