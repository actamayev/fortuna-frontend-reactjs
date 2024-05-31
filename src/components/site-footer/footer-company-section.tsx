import FooterLink from "./footer-link"

export default function FooterCompanySection() {
	return (
		<div>
			<h4 className="text-zinc-900 text-md font-semibold mb-4">Company</h4>
			<FooterLink linkTo="/about" linkTitle="About Us" />
			<FooterLink linkTo="/careers" linkTitle="Careers" />
			<FooterLink linkTo="/contact" linkTitle="Contact" />
		</div>
	)
}
