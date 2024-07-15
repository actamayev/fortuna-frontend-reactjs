import { Helmet } from "react-helmet"

interface Props {
	pageTitleData: string
	description: string
	url: string
}

export default function BasicHelmet(props: Props) {
	const { pageTitleData, description, url } = props

	return (
		<Helmet>
			<title>{pageTitleData}</title>
			<meta property="og:title" content={pageTitleData} />
			<meta name="twitter:title" content={pageTitleData} />

			<meta name="description" content={description}/>
			<meta property="og:description" content={description}/>
			<meta name="twitter:description" content={description}/>

			<meta property="og:url" content={url} />
		</Helmet>
	)
}
