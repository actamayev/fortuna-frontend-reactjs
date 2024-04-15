import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/video/video-player"
import { useVideoContext } from "../contexts/video-context"
import { useSolanaContext } from "../contexts/solana-context"
import useSetSingleVideo from "../hooks/videos/set-single-video"
import useRetrieveMyContent from "../hooks/solana/retrieve-my-content"
import PurchaseSharesCard from "../components/video/purchase-shares-card"
import useRetrieveWalletBalance from "../hooks/solana/retrieve-wallet-balance"

function Video() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const [isVideoLoading, setIsVideoLoading] = useState(true)
	const [isVideoNotFound, setIsVideoNotFound] = useState(false)
	useSetSingleVideo(videoUUID, setIsVideoLoading, setIsVideoNotFound)
	const retrieveWalletBalance = useRetrieveWalletBalance()
	useRetrieveMyContent()

	useEffect(() => {
		if (_.isNull(solanaClass) || !_.isNull(solanaClass.walletBalanceSol)) return
		void retrieveWalletBalance()
	}, [retrieveWalletBalance, solanaClass])

	if (isVideoLoading === true) return <>Loading...</>

	if (isVideoNotFound === true) return <>Unable to find video.</>

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.contextForVideo(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<>
			Token name: {video.splName}
			<br />
			<VideoPlayer videoUrl={video.videoUrl} />
			<br />
			Description: {video.description}
			<br />
			{video.sharesRemainingForSale} Shares Remaining for {video.offeringSharePriceSol} Sol / Share
			<br />
			<PurchaseSharesCard />
		</>
	)
}

export default observer(Video)
