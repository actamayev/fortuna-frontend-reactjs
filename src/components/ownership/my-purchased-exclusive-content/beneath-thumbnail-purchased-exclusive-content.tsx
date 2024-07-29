import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { useRelativeDateFormatter } from "../../../hooks/date-formatter"
import { addDefiniteLeadingAt } from "../../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../../hooks/navigate/navigate-to-creator-page"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
}

function BeneathThumbnailPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent } = props
	const [isHovered, setIsHovered] = useState(false)

	const { creatorUsername, videoName, creatorProfilePictureUrl, uuid,
		channelName, purchaseDate, priceInSol, priceInUsd } = myPurchasedExclusiveContent

	const navigateToCreatorPage = useNavigateToCreatorPage()
	const relativeDateFormatter = useRelativeDateFormatter()
	const navigateToWallet = useTypedNavigate()
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	const navigateToCreatorPageCallback = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [creatorUsername, navigateToCreatorPage])

	const navigateToWalletScreen = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		positionsAndTransactionClass.updateTransactionToFocusOn(uuid)
		navigateToWallet("/wallet")
	}, [uuid, navigateToWallet, positionsAndTransactionClass])

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	return (
		<div className="p-1.5">
			<div className="text-sm font-medium pb-1.5 dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
				{videoName}
			</div>
			<div className="flex items-center space-x-1">
				<div className="flex-shrink-0">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={creatorProfilePictureUrl}
						extraClasses="w-6 h-6 rounded-full object-cover cursor-pointer"
						onClickCreatorPicture={navigateToCreatorPageCallback}
					/>
				</div>
				<div
					className="text-xs font-medium cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap
					text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50"
					onClick={navigateToCreatorPageCallback}
				>
					{channelName}
				</div>
			</div>
			<div
				className={`text-xs font-medium cursor-pointer text-zinc-950 dark:text-zinc-200 pt-1.5 underline decoration-dotted
					${isHovered ? "hover:decoration-solid" : ""} overflow-hidden text-ellipsis whitespace-nowrap`}
				onClick={navigateToWalletScreen}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				Purchased {relativeDateFormatter(purchaseDate, "now")} for&nbsp;
				<ShowProvidedUsdOrSolPrice
					roundOrFixed="round"
					solPriceToDisplay={priceInSol}
					usdPriceToDisplay={priceInUsd}
					extraStyles={isHovered ? "underline decoration-solid" : "underline decoration-dotted"}
				/>
			</div>
		</div>
	)
}

export default observer(BeneathThumbnailPurchasedExclusiveContent)
