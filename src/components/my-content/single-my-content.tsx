import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	content: MyContent
}

export default function SingleMyContent(props: Props) {
	const { content } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	return (
		<div className="bg-white dark:bg-zinc-800 rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2 dark:text-zinc-200">
					{content.videoName}
					<img
						src={content.imageUrl}
						onClick={() => navigateToVideoPage(content.uuid)}
						className="hover:cursor-pointer"
					/>
				</h2>
			</div>
		</div>
	)
}
