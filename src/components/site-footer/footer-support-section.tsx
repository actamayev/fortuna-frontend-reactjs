import FooterHeaderText from "./footer-header-text"
import LinkToExternalSite from "./link-to-external-site"

export default function FooterSupportSection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Support" />
			<LinkToExternalSite
				title="Help Center"
				link="https://help.mintfortuna.com/frequently-asked-questions"
			/>
			<LinkToExternalSite
				title="Privacy Policy"
				link="https://help.mintfortuna.com/legal/privacy-policy"
			/>
		</div>
	)
}
