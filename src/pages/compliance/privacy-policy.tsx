/* eslint-disable max-len */
import { ComplianceHeaderOne, ComplianceHeaderTwo, ComplianceList, ComplianceText } from "../../components/compliance-sections"

export default function PrivacyPolicy() {
	return (
		<div className="dark:text-white">
			<>
				<div className="text-6xl font-black mb-2">
					Privacy Policy
				</div>
				<ComplianceHeaderOne headerTitle="Types of information we collect">
					<ComplianceHeaderTwo headerTitle="Information You Provide Us">
						<ComplianceList>

							<ComplianceText headerTitle="Account Information">
							When you create an account or use our Service, you provide us with certain information. We collect this information, along with other data you add to your account, such as your email address, username, linked social media accounts, favorited items, and watchlisted collections. Your account information (other than your email address) will be publicly visible. Please remember that public content can remain on the internet even after you remove it from your Fortuna account.
							</ComplianceText>

							<ComplianceText headerTitle="Verification Information">
							We may collect information to verify your account or identity, such as your phone number, email address, or information related to the authentication app you use.
							</ComplianceText>

							<ComplianceText headerTitle="Preferences">
							Our Service lets you store preferences, such as how your content is displayed, notification settings, and favorites. We may associate these preferences with your account, browser, and/or mobile device.
							</ComplianceText>

							<ComplianceText headerTitle="Feedback">
							If you provide us with feedback or contact us, we may receive your name and contact information (such as your email address), along with any other content included in or associated with the message you send.
							</ComplianceText>

							<ComplianceText headerTitle="Other Information">
							We also collect information and other data at various points in our Service where you voluntarily provide it, or where we indicate that your information is being collected.
							</ComplianceText>
						</ComplianceList>
					</ComplianceHeaderTwo>
				</ComplianceHeaderOne>
			</>
		</div>
	)
}
