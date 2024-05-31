/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { ComplianceHeaderOne, ComplianceHeaderTwo, ComplianceTextList, ComplianceText, ComplianceHeaderTwoList, ComplianceHeaderOneList } from "../../components/compliance-sections"
import DescriptionPagesHeaderText from "../../components/description-pages-header-text"

// eslint-disable-next-line max-lines-per-function
export default function PrivacyPolicy() {
	return (
		<div className="dark:text-white">
			<>
				<DescriptionPagesHeaderText headerText="Privacy Policy" />
				<ComplianceHeaderOneList>

					<ComplianceHeaderOne headerTitle="Types of information we collect">
						<ComplianceHeaderTwoList>

							<ComplianceHeaderTwo headerTitle="Information You Provide Us">
								<ComplianceTextList>

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
								</ComplianceTextList>
							</ComplianceHeaderTwo>

							Like many web3 services, your blockchain wallet address functions as your identity on Fortuna. You'll need a blockchain wallet and associated wallet address to access certain aspects of the Service. Although a blockchain wallet address alone doesn’t identify you personally, it can become associated with you, your user ID, or other information we collect about you when you use our Service.
							<ComplianceHeaderTwo headerTitle="Information Collected Automatically. As you navigate through and interact with our Service, we may use automatic data collection technologies to collect certain information, including:">
								<ComplianceTextList>

									<ComplianceText headerTitle="Interactions with Our Service">
										To provide our Service, analyze trends, enforce our Terms of Service, and make the Service more useful to you, we collect information (typically Anonymous Data) from your interactions with the Service. This includes your browser type or fingerprint, operating system, IP address and associated geolocation, device ID, blockchain wallet address, wallet type, actions and clickstream data, referring/exit pages, and date/time stamps. We may also store this data in log files.
									</ComplianceText>

									<ComplianceText headerTitle="Cookies or Other Tracking Technologies">
										Like many online services, we use cookies to collect information. Session cookies expire once you close your web browser, while persistent cookies stay on your device until you delete them. This helps us analyze how users interact with our Service, improve product quality, and provide a more personalized experience. We also use "Pixel Tags" (clear GIFs, Web beacons, or Web bugs) to analyze how users find our Service, tailor their experience, and make the Service more useful to them.
									</ComplianceText>

									<ComplianceText headerTitle="Do Not Track">
										As there is no common understanding of what a "Do Not Track" signal means, we don’t respond to these signals in a specific way. See the information below to learn how to withdraw your consent for using tracking technologies like cookies and pixel tags.
									</ComplianceText>

								</ComplianceTextList>
							</ComplianceHeaderTwo>
							We engage with third-party services ("Third Party Services"), such as Google to help collect some of the above information. These Third Party Services may collect data through their cookies, pixel tags, or other technologies ("Usage Information"). The use and sharing of this data is governed by their privacy policies.

							<ComplianceHeaderTwo headerTitle="Information Collected from Third-Party Companies. We may receive information about you from service providers and other companies that offer their products and services to us or to you for use in conjunction with our Service, or whose products and services may be linked from our Service. This information is added to the data we've already collected about you through our Service. Examples include:">
								<ComplianceTextList>

									<ComplianceText headerTitle="Data Analytics Providers or Vendors">
										These vendors, like Google Analytics, provide us with insights into how users interact with our Service.
									</ComplianceText>

									<ComplianceText headerTitle="Communication and Identity Verification Vendors">
										They supply communication and identity verification services.
									</ComplianceText>

									<ComplianceText headerTitle="Other Vendors">
										They provide us with the information needed to run our business and enforce our Terms of Service.
									</ComplianceText>

								</ComplianceTextList>
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Public Information. At Fortuna, we collect data from activity and information that is publicly visible and/or accessible through blockchains or other public sources. This may include, for example, blockchain wallet addresses and information regarding purchases, sales, or transfers of NFTs, which may then be associated with other data you have provided to us.">
							</ComplianceHeaderTwo>

						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Use of Your Information">
						<ComplianceHeaderTwoList>
							<ComplianceHeaderTwo headerTitle="At Fortuna, we process information about and related to you to run our business, provide the Service, personalize your experience, and improve the Service. Specifically, we use your information to:">
								<ComplianceTextList>
									<ComplianceText headerTitle="Provide, operate, and maintain the Service"></ComplianceText>
									<ComplianceText headerTitle="Improve and analyze the Service"></ComplianceText>
									<ComplianceText headerTitle="Analyze, improve, and personalize your experience on the Service, including by making recommendations to you"></ComplianceText>
									<ComplianceText headerTitle="Communicate with you"></ComplianceText>
									<ComplianceText headerTitle="Maintain the safety, security, and integrity of the Service, and investigate, address, and prevent conduct that may violate our Terms of Service or that is otherwise harmful or unlawful"></ComplianceText>
									<ComplianceText headerTitle="Send newsletters, promotional materials, and other notices related to our Service or third-party goods and services"></ComplianceText>
									<ComplianceText headerTitle="Comply with applicable laws, cooperate with investigations by law enforcement or other authorities regarding suspected violations, and/or protect our legal rights and those of our affiliates"></ComplianceText>
									<ComplianceText headerTitle="Act in any other way which we have communicated to you and to which you have consented, or that we may describe when you provide your information"></ComplianceText>

								</ComplianceTextList>
							</ComplianceHeaderTwo>
							<ComplianceHeaderTwo headerTitle="We may create anonymized, de-identified, or aggregated records from identifiable information. We use this data for the same purposes as outlined above, including improving our Service, and may also use or disclose anonymized, de-identified, or aggregated information for any purpose. We will maintain anonymized and de-identified data in its anonymized/de-identified form and will not attempt to re-identify the information unless permitted by law.">

							</ComplianceHeaderTwo>
						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Disclosure of Your Information. We disclose your information and data about you as described below">
						<ComplianceHeaderTwoList>
							<ComplianceHeaderTwo headerTitle="Third-Party Service Providers">
								We may share your information with third-party service providers to provide technical infrastructure services, conduct quality assurance testing, analyze how our Service is used, prevent, detect, and respond to unauthorized activities or potential violations of our Terms of Service or policies, verify identities, provide technical and customer support, and provide other support to you, us, and/or the Service.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Affiliates">
								To provide our Services in line with our contract with you and for our legitimate interests to run an efficient business, we may share some or all of your information with any subsidiaries, joint ventures, or other companies/products under our common control ('Affiliates'), requiring them to adhere to this Privacy Policy.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Information Related to Your Public Activity">
								To provide our Services in line with our contract with you, we may display or share information related to your public activity on the blockchain, Fortuna, and/or other related services. For instance, we may use technology like APIs to make certain information about your blockchain activity available to websites, apps, and other parties for their use.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Corporate Restructuring">
								For our legitimate interests to operate effectively, we may share some or all of your information in connection with or during the negotiation of any merger, financing, acquisition, or dissolution involving the sale, transfer, or divestiture of all or part of our business or assets. In an insolvency, bankruptcy, or receivership situation, your information may be transferred as a business asset. If another company acquires our business, that company will possess the information collected by us and assume the rights and obligations regarding your data as outlined in this Privacy Policy.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Legal Rights">
								In our legitimate interest and/or as required by law, Fortuna may disclose your information if it believes in good faith that such disclosure is necessary: (i) in connection with any legal investigation; (ii) to comply with relevant laws or respond to subpoenas, warrants, or other legal processes; (iii) to protect or defend the rights or property of Fortuna or its users; and/or (iv) to investigate or help prevent violations of the law, this Privacy Policy, or our Terms of Service.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Other Disclosures">
								We may also disclose your information: to fulfill the purpose for which you provide it, including providing you with new features or facilitating login integrations in line with our contract with you; to our professional advisors in the legitimate interests of running a successful business; for any other purpose disclosed when you provide the data; or with your consent.
							</ComplianceHeaderTwo>
						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Third-Party Websites">
						Our Service may contain links to third-party websites. When you click on a link to any other website or location, you will leave our Service and go to another site, which may collect information from you. We have no control over, and cannot be responsible for, these third-party websites or their content. This Privacy Policy does not apply to those third-party websites or their content, nor does it apply to any collection of your information after you click on links to third-party websites. We encourage you to read the privacy policies of every website you visit. Any links to third-party websites are provided for your convenience and do not signify our endorsement of such third parties, their products, or their websites.
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Your Choices Regarding Information">
						<ComplianceHeaderTwoList>
							<ComplianceHeaderTwo headerTitle="Email Communications">
								We may periodically send you newsletters and emails that promote the use of our Service or third-party goods and services. If you'd like to stop receiving these communications from us, follow the unsubscribe instructions provided in the email or change the notification preferences in your account settings. Despite these preferences, we may still send you occasional service-related informational communications.
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="Cookies">
								If you decide that you no longer wish to accept cookies from our Service, you can adjust your browser settings to stop accepting cookies or to notify you before accepting them. If you do not accept cookies, some portions or functionalities of the Service may not be available to you.
							</ComplianceHeaderTwo>
						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Data Access and Control">
						You can view, access, edit, or delete your personal information for certain aspects of the Service through your Settings page. Depending on the applicable laws in your jurisdiction, you may have specific rights concerning your data. However, these rights are not absolute and may only apply in specific circumstances. If the law does not provide such rights in your jurisdiction, Fortuna retains discretion in fulfilling your request
						<ComplianceHeaderTwoList>
							<ComplianceHeaderTwo headerTitle="Rights available may include the right to:">
								<ComplianceTextList>
									<ComplianceText headerTitle="Request access and obtain a copy of your personal information, including details regarding how we use and disclose your personal information"></ComplianceText>
									<ComplianceText headerTitle="Request correction/rectification of any inaccurate personal information that we hold about you"></ComplianceText>
									<ComplianceText headerTitle="Request the deletion of your personal information"></ComplianceText>
									<ComplianceText headerTitle="Object to or restrict the processing of your personal information"></ComplianceText>
									<ComplianceText headerTitle="Request the portability of your personal information; and"></ComplianceText>
									<ComplianceText headerTitle="If we collected and processed your personal information based on your consent, you have the right to withdraw your consent at any time."></ComplianceText>
								</ComplianceTextList>
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="If you wish to exercise your rights under data protection or privacy laws, please contact us through the 'Submit a request' link or at the address provided in Section 15. Clearly specify your request and reference the relevant law. We may ask for additional information to verify your identity (such as an email address or government-issued ID) or request more details about your inquiry. We will consider and act upon your request in accordance with applicable law. You can designate an authorized agent to make requests on your behalf to exercise your rights, but before accepting such a request, we will require proof that you have authorized them to act for you. You may also need to verify your identity directly with us. We will not discriminate against you for exercising any of your rights.">
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="If you believe that we have infringed your rights, we encourage you to contact us using the 'Submit a request' link so we can attempt to resolve the issue or dispute informally. If we deny your request, you have the right to appeal our decision by contacting us via the 'Submit a request' link. If you are not satisfied with our response, you have the right to lodge a complaint with the data protection regulator where you live or work.">
							</ComplianceHeaderTwo>

						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Data Retention">
						At Fortuna, we may continue to retain your information even after you request the deletion of your data if such retention is reasonably necessary to comply with legal obligations, resolve disputes, prevent fraud and abuse, enforce our Terms or other agreements, and/or protect our legal rights and other interests. Otherwise, we retain information for as long as is reasonably necessary for the purposes outlined in this Privacy Policy.  When determining the duration of retention, we consider various factors, including whether we need the information to continue providing our Services, comply with legal obligations, and other relevant criteria as outlined in this section.
					</ComplianceHeaderOne>


					<ComplianceHeaderOne headerTitle="Security">
						At Fortuna, we prioritize the security of your information and use physical, administrative, and technological safeguards to maintain the integrity and security of the data collected through our Service. However, no security system is impenetrable, and we cannot guarantee the absolute security of our systems or those of our vendors. In the event that any information under our control is compromised due to a security breach, we will take steps to investigate and remediate the situation. In accordance with applicable laws and regulations, we may also notify affected individuals whose information may have been compromised.
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Minors">
						We do not intentionally collect information from visitors who are under the age of 13. Our Terms of Service require all users to be at least 18 years old. Minors who are at least 13 years old but under 18 years old may use a parent or guardian's account, but only with the supervision of the account holder. If a child under 13 submits identifiable information to us, and we learn that the information belongs to a child under 13, we will attempt to delete the data as soon as possible. If you believe we might have any identifiable information from a child under 13, please contact us by using the 'Submit a request' link or at the address indicated in Section 15 below.
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Users Outside of the United States">
						Fortuna operates exclusively within the United States and does not accept international users. By using our Service, you confirm that you are located within the U.S. and understand that your information will be collected, processed, and stored in accordance with U.S. laws and regulations.
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Changes to This Privacy Policy">
						This Privacy Policy may be updated periodically for any reason. We will notify you of changes by posting the new Privacy Policy on our website at https://mintfortuna.com/privacy-policy. The date the Privacy Policy was last revised is identified at the beginning of this document. You are responsible for periodically reviewing this Privacy Policy and checking our Service for any changes.
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="United States Disclosures">
						<ComplianceHeaderTwoList>
							<ComplianceHeaderTwo headerTitle="This section applies if you are a resident of California, Colorado, or another U.S. state with privacy laws similar to the California Consumer Privacy Act (CCPA). Over the past 12 months, Fortuna has collected the following categories of personal information (including sensitive personal information, denoted by *), as described in Section 1 above:  (1) identifiers,  (2) commercial information,  (3) internet and similar network activity,  (4) geolocation data,  (5) information derived from other personal information about you, and  (6) account access credentials*.">
							</ComplianceHeaderTwo>

							<ComplianceHeaderTwo headerTitle="The categories of sources from which the personal information is collected are described above in Section 1."></ComplianceHeaderTwo>
							<ComplianceHeaderTwo headerTitle="The business or commercial purpose for collecting and using personal information, and the third parties we have disclosed such information to over the past 12 months, are described above in Sections 2 and 3.** We only use and disclose sensitive personal information for the purposes specified in the CCPA or otherwise in line with your consent. We retain information, including sensitive personal information, for as long as is reasonably necessary for the purposes described in Section 8 above."></ComplianceHeaderTwo>
							<ComplianceHeaderTwo headerTitle="The categories of personal information we shared with third parties over the past 12 months, as described above in Section 3, include: (1) identifiers, (2) commercial information, (3) internet and similar network activity, (4) geolocation data, (5) information derived from other personal information about you, and (6) account access credentials*."></ComplianceHeaderTwo>

						</ComplianceHeaderTwoList>
					</ComplianceHeaderOne>

					<ComplianceHeaderOne headerTitle="Questions; Contacting Us; Reporting Violations">
						If you have any questions, concerns, or complaints about our Privacy Policy or our data collection and processing practices, or if you wish to report any security violations, please contact us by using the “Submit a request” link or through our website.
					</ComplianceHeaderOne>
				</ComplianceHeaderOneList>
			</>
		</div>
	)
}
