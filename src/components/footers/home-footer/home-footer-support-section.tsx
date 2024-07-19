import LinkToExternalSite from "../link-to-external-site"

export default function HomeFooterSupportSection() {
	return (
		<div className="flex space-x-6 flex-row">
			<LinkToExternalSite
				title="Privacy"
				link="https://help.createfortuna.com/legal/privacy-policy"
				extraClasses=""
			/>
			<LinkToExternalSite
				title="About Us"
				link="https://help.createfortuna.com"
				extraClasses=""
			/>
			<LinkToExternalSite
				title="FAQ"
				link="https://help.createfortuna.com/frequently-asked-questions"
			/>
		</div>
	)
}
