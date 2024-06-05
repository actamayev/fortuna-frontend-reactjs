import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
}

export default function SingleMyPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2">
					{myPurchasedExclusiveContent.videoName}
					<img
						src={myPurchasedExclusiveContent.imageUrl}
						onClick={() => navigateToVideoPage(myPurchasedExclusiveContent.uuid)}
						className="hover:cursor-pointer"
					/>
				</h2>
			</div>
		</div>
	)
}
