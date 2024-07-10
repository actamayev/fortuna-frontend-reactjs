export default function MyContentHeader() {
	return (
		<div
			className="grid grid-cols-12 gap-4 py-2 border-b text-sm \
				bg-white dark:bg-neutral-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200"
		>
			<div className="col-span-5">Video</div>
			<div className="col-span-1">Visibility</div>
			<div className="col-span-1">Date</div>
			<div className="col-span-2">Likes (vs. dislikes)</div>
			<div className="col-span-3">Earnings ($)</div>
		</div>
	)
}
