import { useCallback } from "react"
import DescriptionPagesHeaderText from "../../components/description-pages-header-text"

export default function Contact() {

	const copyToClipboard = useCallback(async (email: string) => {
		try {
			await navigator.clipboard.writeText(email)
		} catch (error) {
			console.error(error)
		}
	}, [])

	return (
		<div className="text-zinc-950 dark:text-zinc-200 py-5 px-48">
			<DescriptionPagesHeaderText headerText="Contact Us" />
			<div className="grid grid-cols-2 gap-4">
				<div >
					We love hearing your feedback and helping with whatever we can.
				</div>
				<div>
					<div className="border rounded-lg py-1 px-0.5 w-72 mx-auto bg-white dark:bg-zinc-800">
						<div className="flex justify-between py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 mx-2 rounded-sm">
							<span className="text-left ml-2">Levi</span>
							<span
								className="text-right cursor-pointer font-semibold mr-2"
								onClick={() => copyToClipboard("levi@mintfortuna.com")}
							>
								levi@mintfortuna.com
							</span>
						</div>
						<div className="flex justify-between py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 mx-2 rounded-sm">
							<span className="text-left ml-2">Ariel</span>
							<span
								className="text-right cursor-pointer font-semibold mr-2"
								onClick={() => copyToClipboard("ariel@mintfortuna.com")}
							>
								ariel@mintfortuna.com
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
