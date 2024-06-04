import FooterLink from "./footer-link"
import FooterHeaderText from "./footer-header-text"

export default function FooterSupportSection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Support" />
			<div
				className="mb-2 tex-zinc-950 dark:text-zinc-200 cursor:pointer text-sm"
				style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "300"}}
			>
				<a
					href="https://help.mintfortuna.com"
					aria-label="X"
					className="tex-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
					target="_blank"
					rel="noopener noreferrer"
				>
					Help Center
				</a>
			</div>
			<FooterLink linkTo="/faq" linkTitle="FAQ" />
			<FooterLink linkTo="/privacy-policy" linkTitle="Privacy Policy" />
		</div>
	)
}
