import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import useVideoSearch from "../hooks/search/video-search"
import { useVideoContext } from "../contexts/video-context"
import SingleSearchItem from "../components/search/single-search-item"

function SearchResults() {
	const { searchTerm } = useParams<{ searchTerm: string }>()
	const videoClass = useVideoContext()
	const videoSearch = useVideoSearch()

	if (_.isUndefined(searchTerm)) return null

	if (videoClass.isCurrentlySearching === true) {
		return <div className="dark:text-zinc-200">Searching...</div>
	}
	if (_.isUndefined(videoClass.contextForSearchMap(searchTerm))) {
		videoClass.setSearchTerm(searchTerm)
		void videoSearch()
	}

	const searchResults = videoClass.contextForSearchMap(searchTerm)
	if (_.isUndefined(searchResults)) return null

	if (_.isEmpty(searchResults)) {
		return <div className="dark:text-zinc-200">No results</div>
	}

	return (
		<div className="flex flex-col items-center">
			{searchResults.map((searchResult, index) => (
				<SingleSearchItem key={index} searchResult={searchResult} />
			))}
		</div>
	)
}

export default observer(SearchResults)
