import NonHomeFooterHeaderText from "./non-home-footer-header-text"
import LinkToExternalSite from "../link-to-external-site"

export default function NonHomeFooterSupportSection() {
	return (
		<div>
			<NonHomeFooterHeaderText headerTitle="Support" />
			<LinkToExternalSite
				title="Help Center"
				link="https://help.createfortuna.com/frequently-asked-questions"
			/>
			<LinkToExternalSite
				title="Privacy Policy"
				link="https://help.createfortuna.com/legal/privacy-policy"
			/>
		</div>
	)
}
