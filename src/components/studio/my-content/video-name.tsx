interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

export default function VideoName(props: Props) {
	const { content, toggleModalOpen } = props

	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				<span
					className="text-zinc-950 dark:text-zinc-50 text-xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 px-2"
					onClick={toggleModalOpen}
				>
					{content.videoName}
				</span>
			</div>
		</div>
	)
}
