import helmetData from "../../utils/helmet-data"

interface Props {
	pageTitle: PageNames
}

export default function PageHelmet(props: Props) {
	const { pageTitle } = props
	const helmetContent = helmetData[pageTitle]

	return <>{helmetContent || null}</>
}
