import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	content: MyContent
}

export default function SingleMyContent(props: Props) {
	const { content } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2 dark:text-white">
					{content.splName}
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
