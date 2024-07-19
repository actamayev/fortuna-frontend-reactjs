import FooterLink from "../footer-link"

export default function HomeFooterCenterSection() {
	return (
		<div className="flex flex-row items-center justify-center">
			<FooterLink linkTo="/contact" linkTitle="Contact Us" />
			<div className="text-center text-zinc-950 dark:text-zinc-50 font-normal text-base">
				Fortuna Systems Inc
			</div>
		</div>
	)
}
