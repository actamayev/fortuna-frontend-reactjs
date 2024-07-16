import SortByLockStatus from "./sort-by-lock-status"
import CreatorVideosSearchBox from "./creator-videos-search-box"
import SortByTimeFrameAndPopularity from "./sort-by-time-frame-and-popularity"

export default function CreatorVideosFilterRow() {
	return (
		<div className="flex justify-center w-2/3 mb-3">
			<div className="flex flex-row text-zinc-600 dark:text-zinc-200 text-sm w-1/2 max-w-4xl mx-auto">
				<div className="border border-zinc-700 dark:border-zinc-300 p-1 mr-2 rounded-xl">
					<div className="flex flex-row">
						<SortByTimeFrameAndPopularity />
					</div>
				</div>
				<div className="border border-zinc-700 dark:border-zinc-300 p-1 mr-2 rounded-xl">
					<div className="flex flex-row">
						<SortByLockStatus />
					</div>
				</div>
				<div className="border border-zinc-700 dark:border-zinc-300 p-1 mr-2 rounded-xl">
					<CreatorVideosSearchBox />
				</div>
			</div>
		</div>
	)
}
