import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/video/video-player"
import { useVideoContext } from "../contexts/video-context"
import useSetSingleVideo from "../hooks/videos/set-single-video"
import PurchaseSharesCard from "../components/video/purchase-shares-card"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import useConvertUsdAmountDefaultCurrency from "../hooks/solana/currency-conversions/convert-usd-amount-to-default-currency"

function Video() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const personalInfoClass = usePersonalInfoContext()
	const [isVideoLoading, setIsVideoLoading] = useState(false)
	const [isVideoNotFound, setIsVideoNotFound] = useState(false)
	useSetSingleVideo(videoUUID, setIsVideoLoading, setIsVideoNotFound)
	const convertUsdAmountToDefaultCurrency = useConvertUsdAmountDefaultCurrency()

	if (_.isUndefined(videoUUID) || _.isNull(personalInfoClass)) return null
	if (isVideoLoading === true) return <>Loading...</>

	if (isVideoNotFound === true) return <>Unable to find video.</>

	const video = videoClass.contextForVideo(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<>
			<div className="dark:text-white">
				Token name: {video.splName}
				<br />
				<VideoPlayer videoUrl={video.videoUrl} />
				<br />
				Description: {video.description}
				<br />
				{video.sharesRemainingForSale} Shares Remaining for
				{personalInfoClass.getDefaultCurrency() === "usd" && (<> $</>)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> </>)}
				{convertUsdAmountToDefaultCurrency(video.offeringSharePriceUsd)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> Sol</>)}
				/ Share
				<br />
				Total Outstanding shares: {video.totalNumberShares}
			</div>
			<PurchaseSharesCard />
		</>
	)
}

export default observer(Video)
