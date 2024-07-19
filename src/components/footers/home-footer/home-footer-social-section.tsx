import XLink from "../../social-links/x-link"
import LinkedinLink from "../../social-links/linkedin-link"

export default function HomeFooterSocialSection() {
	return (
		<div className="flex space-x-4">
			<XLink />
			<LinkedinLink />
		</div>
	)
}
