interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

export default function VideoDescription(props: Props) {
	const { content, toggleModalOpen } = props

	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				<span
					className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 pl-1 pr-3"
					onClick={toggleModalOpen}
				>
					{content.description}
				</span>
			</div>
		</div>
	)
}
