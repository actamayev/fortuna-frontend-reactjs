import CreatorVideosSearchBox from "./creator-videos-search-box"
import SortByTimeFrameAndPopularity from "./sort-by-time-frame-and-popularity"

export default function CreatorVideosFilterRow() {
	return (
		<div className="flex flex-row text-zinc-600 dark:text-zinc-200 text-sm">
			<div className="w-1/3 border border-black dark:border-white">
				<CreatorVideosSearchBox />
			</div>
			<div className="w-1/3 border border-black dark:border-white">
				<SortByTimeFrameAndPopularity />
			</div>
		</div>
	)
}
