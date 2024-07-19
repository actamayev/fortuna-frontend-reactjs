import FooterLink from "../footer-link"
import LinkToExternalSite from "../link-to-external-site"
import NonHomeFooterHeaderText from "./non-home-footer-header-text"

export default function NonHomeFooterCompanySection() {
	return (
		<div>
			<NonHomeFooterHeaderText headerTitle="Company" />
			<LinkToExternalSite
				title="About Us"
				link="https://help.createfortuna.com"
				extraClasses="mb-2"
			/>
			<FooterLink
				linkTo="/contact"
				linkTitle="Contact Us"
			/>
		</div>
	)
}
