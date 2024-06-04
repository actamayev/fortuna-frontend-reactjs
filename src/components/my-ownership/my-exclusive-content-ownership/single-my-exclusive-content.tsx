import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	myExclusiveContent: MyExclusiveContentData
}

export default function SingleMyExclusiveContent(props: Props) {
	const { myExclusiveContent } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2">
					{myExclusiveContent.splName}
					<img
						src={myExclusiveContent.imageUrl}
						onClick={() => navigateToVideoPage(myExclusiveContent.uuid)}
						className="hover:cursor-pointer"
					/>
				</h2>
			</div>
		</div>
	)
}
