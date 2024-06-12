import { useCallback, useState } from "react"
import NotificationBox from "../../components/contact/notification-box"
import ContactItemInCard from "../../components/contact/contact-item-in-card"
import DescriptionPagesHeaderText from "../../components/description-pages-header-text"

export default function Contact() {
	// TODO: Make a ariel@minfortuna.com'copied to clipboard' notification
	const [notification, setNotification] = useState<string | null>(null)
	const [showNotification, setShowNotification] = useState(false)

	const closeNotification = useCallback(() => {
		setShowNotification(false)
	}, [])

	return (
		<div>

			<div className="text-zinc-950 dark:text-zinc-200 py-5 px-48">
				<DescriptionPagesHeaderText headerText="Contact Us" />
				<div className="grid grid-cols-2 gap-4">
					<div className="mt-9">
						We love hearing your feedback and helping with whatever we can.
					</div>
					<div>
						<div className="border border-zinc-200 dark:border-zinc-700 \
							rounded-lg py-1 px-0.5 mx-auto bg-white dark:bg-zinc-800 w-80"
						>
							<ContactItemInCard
								name="Levi"
								email="levi@mintfortuna.com"
								setNotification={setNotification}
								setShowNotification={setShowNotification}
							/>
							<ContactItemInCard
								name="Ariel"
								email="ariel@mintfortuna.com"
								setNotification={setNotification}
								setShowNotification={setShowNotification}
							/>
						</div>
					</div>
				</div>
			</div>
			{notification && (
				<NotificationBox
					message={notification}
					showNotification={showNotification}
					onClose={closeNotification}
				/>
			)}
		</div>
	)
}
