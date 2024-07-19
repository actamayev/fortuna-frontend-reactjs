import LinkToExternalSite from "../link-to-external-site"

export default function HomeFooterSupportSection() {
	return (
		<div className="flex space-x-10">
			<LinkToExternalSite
				title="About Us"
				link="https://help.createfortuna.com"
			/>
			<LinkToExternalSite
				title="FAQ"
				link="https://help.createfortuna.com/frequently-asked-questions"
			/>
			<LinkToExternalSite
				title="Privacy Policy"
				link="https://help.createfortuna.com/legal/privacy-policy"
			/>
		</div>
	)
}
