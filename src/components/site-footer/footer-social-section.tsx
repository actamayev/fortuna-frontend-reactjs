import { FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function FooterSocialSection() {
	return (
		<div>
			<h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
			<div className="flex space-x-4">
				{/* <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-white">
					<FaFacebook size={24} />
				</a> */}
				<a href="https://x.com/mintfortuna" aria-label="X" className="text-gray-300 hover:text-white">
					<FaXTwitter size={24} />
				</a>
				<a href="https://www.linkedin.com/company/mint-fortuna" aria-label="LinkedIn" className="text-gray-300 hover:text-white">
					<FaLinkedin size={24} />
				</a>
				{/* <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-white">
					<FaInstagram size={24} />
				</a> */}
			</div>
		</div>
	)
}
