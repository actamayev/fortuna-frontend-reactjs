import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../contexts/video-context"
import SingleSearchItem from "../components/search/single-search-item"
import useVideoSearch from "../hooks/search/video-search"

function SearchResults() {
	const { searchTerm } = useParams<{ searchTerm: string }>()
	const videoClass = useVideoContext()
	const videoSearch = useVideoSearch()

	if (_.isUndefined(searchTerm)) return null

	if (videoClass.isCurrentlySearching === true) {
		return <div>Searching...</div>
	}
	if (_.isUndefined(videoClass.contextForSearchMap(searchTerm))) {
		videoClass.setSearchTerm(searchTerm)
		void videoSearch()
	}

	const searchResults = videoClass.contextForSearchMap(searchTerm)
	if (_.isUndefined(searchResults)) return null

	return (
		<>
			{searchResults.map((searchResult, index) => {
				return <SingleSearchItem key = {index} searchResult={searchResult} />
			})}
		</>
	)
}

export default observer(SearchResults)
