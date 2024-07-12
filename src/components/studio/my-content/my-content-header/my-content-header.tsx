import VisibilityHeader from "./visibility-header"
import SortContentByArrow from "./sort-content-by-arrow"
import MyVideoContentContainsSearchBox from "./my-video-content-contains-search-box"

export default function MyContentHeader() {
	return (
		<div
			className="grid grid-cols-12 gap-4 py-3 border-b text-sm \
				bg-white dark:bg-neutral-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200"
		>
			<div className="col-span-2">Video</div>
			<div className="col-span-3 px-2">
				<MyVideoContentContainsSearchBox />
			</div>
			<div className="col-span-1">
				<VisibilityHeader />
			</div>
			<div className="col-span-1 flex items-center">
				<SortContentByArrow sortBy="Date" />
			</div>

			<div className="col-span-2">Likes (vs. dislikes)</div>
			<div className="col-span-2 flex items-center">
				<SortContentByArrow sortBy="Earnings" />
			</div>
			<div className="col-span-1 justify-end flex">Link to Video</div>
		</div>
	)
}
