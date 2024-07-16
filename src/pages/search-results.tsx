import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import useVideoSearch from "../hooks/search/video-search"
import { useVideoContext } from "../contexts/video-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import SingleSearchItem from "../components/search/single-search-item"

function SearchResults() {
	const { searchTerm } = useParams<{ searchTerm: string }>()
	const videoClass = useVideoContext()
	const videoSearch = useVideoSearch()

	if (_.isUndefined(searchTerm)) return null

	if (videoClass.isCurrentlySearching === true) {
		return (
			<>
				<BasicHelmet
					pageTitleData={searchTerm}
					description={`Searching for videos related to ${searchTerm} on Fortuna.
					Discover exclusive content and connect with your favorite creators.`}
					url={`https://www.createfortuna.com/s/${searchTerm}`}
				/>
				<div className="dark:text-zinc-200">
					Searching...
				</div>
			</>
		)
	}

	if (_.isUndefined(videoClass.contextForSearchMap(searchTerm))) {
		videoClass.setSearchTerm(searchTerm)
		void videoSearch()
	}

	const searchResults = videoClass.contextForSearchMap(searchTerm)
	if (_.isUndefined(searchResults)) return null

	if (_.isEmpty(searchResults)) {
		return (
			<>
				<BasicHelmet
					pageTitleData={searchTerm}
					description={`No results found for ${searchTerm} on Fortuna.
					Try searching for different keywords to find exclusive video content.`}
					url={`https://www.createfortuna.com/s/${searchTerm}`}
				/>
				<div className="dark:text-zinc-200">
					No results
				</div>
			</>
		)
	}

	return (
		<>
			<BasicHelmet
				pageTitleData={searchTerm}
				description={`Search results for ${searchTerm} on Fortuna. Explore exclusive videos and content from top creators.`}
				url={`https://www.createfortuna.com/s/${searchTerm}`}
			/>
			<div className="flex flex-col items-center space-y-3">
				{searchResults.map((searchResult, index) => (
					<SingleSearchItem key={index} searchResult={searchResult} />
				))}
			</div>
		</>
	)
}

export default observer(SearchResults)
