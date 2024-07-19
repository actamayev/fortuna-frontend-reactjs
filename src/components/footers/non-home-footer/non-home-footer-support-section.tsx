import LinkToExternalSite from "../link-to-external-site"
import NonHomeFooterHeaderText from "./non-home-footer-header-text"

export default function NonHomeFooterSupportSection() {
	return (
		<div>
			<NonHomeFooterHeaderText headerTitle="Support" />
			<LinkToExternalSite
				title="Help Center"
				link="https://help.createfortuna.com/frequently-asked-questions"
				extraClasses="mb-2"
			/>
			<LinkToExternalSite
				title="Privacy"
				link="https://help.createfortuna.com/legal/privacy-policy"
				extraClasses="mb-2"
			/>
		</div>
	)
}
