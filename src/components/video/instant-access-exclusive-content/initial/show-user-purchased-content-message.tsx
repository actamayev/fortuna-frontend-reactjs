import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

function ShowUserPurchasedContentMessage() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(videoUUID)

	if (doesUserHaveAccessToExclusiveContent === false) return null

	return (
		<div className="flex items-center w-full">
			<span>You already purchased access to this exclusive video</span>
		</div>
	)
}

export default observer(ShowUserPurchasedContentMessage)
