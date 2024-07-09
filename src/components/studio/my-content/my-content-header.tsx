export default function MyContentHeader() {
	return (
		<div
			className="grid grid-cols-12 gap-4 p-4 rounded-t-lg border-b \
				bg-white dark:bg-neutral-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200"
		>
			<div className="col-span-4">Video</div>
			<div className="col-span-2">Visibility</div>
			<div className="col-span-2">Date</div>
			<div className="col-span-2">Earnings ($)</div>
			<div className="col-span-2">Likes (vs dislikes)</div>
		</div>
	)
}
