import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import ShowAuthToNullUser from "../show-auth-to-null-user"
import { useAuthContext } from "../../contexts/auth-context"
import { useVideoContext } from "../../contexts/video-context"
import { useCreatorContext } from "../../contexts/creator-context"
import PurchaseInstantAccessOptions from "./instant-access-exclusive-content/purchase-instant-access-options"

interface Props {
	videoUUID: string
}

function PurchaseExclusiveAccessCard(props: Props) {
	const { videoUUID } = props
	const videoClass = useVideoContext()
	const authClass = useAuthContext()
	const creatorClass = useCreatorContext()
	const video = videoClass.findVideoFromUUID(videoUUID)

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(creatorClass) || _.isUndefined(videoUUID)) return true
		return creatorClass.checkIfUuidExistsInContentList(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContent, videoUUID])

	if (_.isNil(video?.numberOfExclusivePurchasesSoFar)) {
		return <>Not exclusive</>
	}

	if (authClass.isLoggedIn === false) {
		return (
			<ShowAuthToNullUser
				whereToNavigate={`/v/${videoUUID}`}
				customStyles={{ width: "100%" }}
			/>
		)
	}

	if (wasVideoCreatedByUser === true) {
		return (
			<div className="h-full">
				You have access to your own video
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
