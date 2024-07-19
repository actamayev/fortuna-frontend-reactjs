import XLink from "../../social-links/x-link"
import FooterHeaderText from "./footer-header-text"
import LinkedinLink from "../../social-links/linkedin-link"

export default function FooterSocialSection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Social" />
			<div className="flex space-x-4">
				<XLink />
				<LinkedinLink />
			</div>
		</div>
	)
}
