import { isVideoData } from "../../utils/type-checks"
import SingleVideoSearchItem from "./single-video-search-item"
import SingleCreatorSearchItem from "./single-creator-search-item"

interface Props {
	searchResult: SearchData
}

export default function SingleSearchItem(props: Props) {
	const { searchResult } = props

	if (isVideoData(searchResult)) {
		return <SingleVideoSearchItem videoData={searchResult} />
	}
	return <SingleCreatorSearchItem creatorData={searchResult} />
}
