import { useCallback } from "react"
import { observer } from "mobx-react"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { useRelativeDateFormatter } from "../../hooks/date-formatter"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowProvidedUsdOrSolPrice from "../usd-or-sol/show-provided-usd-or-sol-price"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
}

function BeneathThumbnailPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()
	const relativeDateFormatter = useRelativeDateFormatter()
	const navigateToWallet = useTypedNavigate()

	const navigateToCreatorPageCallback = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToCreatorPage(addDefiniteLeadingAt(myPurchasedExclusiveContent.creatorUsername))
	}, [myPurchasedExclusiveContent.creatorUsername, navigateToCreatorPage])

	const navigateToWalletScreen = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToWallet("/wallet")
	}, [navigateToWallet])

	return (
		<div className="flex flex-col">
			<div className="text-sm font-medium my-2 dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
				{myPurchasedExclusiveContent.videoName}
			</div>
			<div className="flex items-center">
				<div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center mr-1.5">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={myPurchasedExclusiveContent.creatorProfilePictureUrl}
						extraClasses="min-w-full min-h-full object-cover cursor-pointer"
						onClickCreatorPicture={navigateToCreatorPageCallback}
					/>
				</div>
				<div
					className="text-xs font-medium cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap
						text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50"
					onClick={navigateToCreatorPageCallback}
				>
					{myPurchasedExclusiveContent.channelName}
				</div>
			</div>
			<div
				className="text-xs font-medium cursor-pointer text-zinc-950 dark:text-zinc-200 mt-2
					underline decoration-dotted hover:decoration-solid overflow-hidden text-ellipsis whitespace-nowrap"
				onClick={navigateToWalletScreen}
			>
					Purchased {relativeDateFormatter(myPurchasedExclusiveContent.purchaseDate)} for {" "}
				<ShowProvidedUsdOrSolPrice
					roundOrFixed="round"
					solPriceToDisplay={myPurchasedExclusiveContent.priceInSol}
					usdPriceToDisplay={myPurchasedExclusiveContent.priceInUsd}
				/>
			</div>
		</div>
	)
}

export default observer(BeneathThumbnailPurchasedExclusiveContent)
