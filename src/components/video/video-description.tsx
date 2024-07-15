import _ from "lodash"
import { useState } from "react"
import { useActualDateFormatter, useRelativeDateFormatter } from "../../utils/date-formatter"

interface Props {
	video: SingleVideoDataFromBackend
}

export default function VideoDescription(props: Props) {
	const { video } = props
	const [isOpen, setIsOpen] = useState(false)
	const actualDateFormatter = useActualDateFormatter()
	const relativeDateFormatter = useRelativeDateFormatter()

	if (isOpen === false) {
		return (
			<div
				className="rounded-md px-2 py-1.5 cursor-pointer dark:text-white
			bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600 text-sm"
				onClick={() => setIsOpen(true)}
			>
				<div>{relativeDateFormatter(video.createdAt)}</div>
				<div>{_.truncate(video.description, { length: 300 })}</div>
			</div>
		)
	}

	return (
		<div className="rounded-md px-2 py-1.5 dark:text-white bg-zinc-100 dark:bg-zinc-700 text-sm">
			<div>
				<div>{actualDateFormatter(video.createdAt)}</div>
				<div>{video.description}</div>
			</div>
			<div className="my-2 flex justify-end">
				<span
					className="rounded-lg cursor-pointer p-2 font-medium
					bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 hover:dark:bg-zinc-900"
					onClick={() => setIsOpen(false)}
				>
					Collapse
				</span>
			</div>
		</div>
	)
}
