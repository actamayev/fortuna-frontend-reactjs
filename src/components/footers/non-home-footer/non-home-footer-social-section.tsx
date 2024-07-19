import XLink from "../../social-links/x-link"
import LinkedinLink from "../../social-links/linkedin-link"
import NonHomeFooterHeaderText from "./non-home-footer-header-text"

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
