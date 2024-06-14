/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import XLink from "../../components/social-links/x-link"
import NotificationBox from "../../components/notification-box"
import LinkedinLink from "../../components/social-links/linkedin-link"
import ContactItemInCard from "../../components/contact/contact-item-in-card"
import DescriptionPagesHeaderText from "../../components/description-pages-header-text"

export default function Contact() {
	const [notification, setNotification] = useState<string | null>(null)

	return (
		<div>
			<div className="text-zinc-950 dark:text-zinc-200 py-5 px-48">
				<DescriptionPagesHeaderText headerText="Contact Us" />
				<div className="grid grid-cols-2 gap-4">
					<div className="mt-10">
						We love hearing your feedback and helping with whatever we can.
						Whether you have a question, need assistance, or just want to share your thoughts, we're here for you.
						For any inquiries, please reach out to us:
					</div>
					<div className="flex flex-col items-center">
						<div className="border border-zinc-200 dark:border-zinc-700 rounded-lg py-1 \
							px-0.5 mx-auto bg-white dark:bg-zinc-800 w-80 mt-10">
							<ContactItemInCard
								name="Levi"
								email="levi@mintfortuna.com"
								setNotification={setNotification}
							/>
							<ContactItemInCard
								name="Ariel"
								email="ariel@mintfortuna.com"
								setNotification={setNotification}
							/>
						</div>
						<div className="flex justify-center mt-4 space-x-4">
							<XLink />
							<LinkedinLink />
						</div>
					</div>

				</div>
			</div>
			{notification && (
				<NotificationBox
					message={notification}
					onClose={() => setNotification(null)}
				/>
			)}
		</div>
	)
}
