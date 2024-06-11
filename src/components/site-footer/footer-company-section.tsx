import FooterLink from "./footer-link"
import FooterHeaderText from "./footer-header-text"

export default function FooterCompanySection() {
	return (
		<div>
			<FooterHeaderText headerTitle="Company" />
			<div
				className="mb-2 text-zinc-950 dark:text-zinc-200 cursor:pointer text-sm"
				style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "300"}}
			>
				<a
					href="https://help.mintfortuna.com"
					aria-label="Help Center"
					className="text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
					target="_blank"
					rel="noopener noreferrer"
				>
					About Us
				</a>
			</div>
			<FooterLink linkTo="/contact" linkTitle="Contact" />
		</div>
	)
}
