import { Helmet } from "react-helmet"

interface Props {
	pageTitleData: string
}

export default function BasicHelmet(props: Props) {
	const { pageTitleData } = props

	return (
		<Helmet>
			<title>{pageTitleData}</title>
		</Helmet>
	)
}
