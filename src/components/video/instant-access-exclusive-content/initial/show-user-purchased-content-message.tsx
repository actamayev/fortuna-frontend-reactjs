import { observer } from "mobx-react"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	uuid: string
}

function ShowUserPurchasedContentMessage(props: Props) {
	const { uuid } = props
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(uuid)

	if (doesUserHaveAccessToExclusiveContent === false) return null

	return (
		<div className="flex items-center w-full">
			<span>You already purchased access to this exclusive video</span>
		</div>
	)
}

export default observer(ShowUserPurchasedContentMessage)
