import _ from "lodash"

interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

export default function VideoDescription(props: Props) {
	const { content, toggleModalOpen } = props

	return (
		<div className="flex items-center w-full">
			<div
				className="relative flex flex-grow hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 px-2"
				onClick={toggleModalOpen}
			>
				<span className="text-zinc-700 dark:text-zinc-300 text-sm font-normal w-full">
					{_.truncate(content.description, { length: 70, omission: "..."})}
				</span>
			</div>
		</div>
	)
}
