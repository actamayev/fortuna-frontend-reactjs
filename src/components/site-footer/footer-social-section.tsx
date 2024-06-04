import { FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import FooterHeaderText from "./footer-header-text"

export default function FooterSocialSection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Social" />
			<div className="flex space-x-4">
				{/* <a href="https://facebook.com" aria-label="Facebook" className="text-zinc-300 hover:text-zinc-200">
					<FaFacebook size={24} />
				</a> */}
				<a
					href="https://x.com/mintfortuna"
					aria-label="X"
					className="text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaXTwitter size={24} />
				</a>
				<a
					href="https://www.linkedin.com/company/mint-fortuna"
					aria-label="LinkedIn"
					className="text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin size={24} />
				</a>
				{/* <a href="https://instagram.com" aria-label="Instagram" className="text-zinc-300 hover:text-zinc-200">
					<FaInstagram size={24} />
				</a> */}
			</div>
		</div>
	)
}
