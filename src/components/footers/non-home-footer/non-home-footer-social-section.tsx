import XLink from "../../social-links/x-link"
import NonHomeFooterHeaderText from "./non-home-footer-header-text"
import LinkedinLink from "../../social-links/linkedin-link"

export default function NonHomeFooterSocialSection() {
	return (
		<div>
			<NonHomeFooterHeaderText headerTitle="Social" />
			<div className="flex space-x-4">
				<XLink />
				<LinkedinLink />
			</div>
		</div>
	)
}
