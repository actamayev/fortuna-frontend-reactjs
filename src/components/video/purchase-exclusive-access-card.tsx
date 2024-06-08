import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import { useCreatorContext } from "../../contexts/creator-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import PurchaseInstantAccessOptions from "./instant-access-exclusive-content/purchase-instant-access-options"

interface Props {
	videoUUID: string
}

// TODO: This card should go behind the footer when scrolling down
function PurchaseExclusiveAccessCard(props: Props) {
	const { videoUUID } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const creatorClass = useCreatorContext()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(creatorClass) || _.isUndefined(videoUUID)) return true
		return creatorClass.checkIfUuidExistsInContentList(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContent, videoUUID])

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-200 dark:bg-blue-400"
				hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
				title="Please create an account to unlock access"
				className="font-semibold dark:text-zinc-950"
			/>
		)
	}

	if (wasVideoCreatedByUser === true) {
		return (
			<div className="h-full">
				You already have access to your own video
			</div>
		)
	}

	return (
		<div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 h-full">
			<PurchaseInstantAccessOptions />
		</div>
	)
}

export default observer(PurchaseExclusiveAccessCard)
