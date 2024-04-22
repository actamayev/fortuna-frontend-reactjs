import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	ownership: MyOwnership
}

export default function SingleOwnership(props: Props) {
	const { ownership } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2">
					{ownership.splName}
					<img
						src={ownership.imageUrl}
						onClick={() => navigateToVideoPage(ownership.uuid)}
						className="hover:cursor-pointer"
					/>
				</h2>
				<p>Number of shares: {ownership.numberOfShares}</p>
			</div>
		</div>
	)
}
