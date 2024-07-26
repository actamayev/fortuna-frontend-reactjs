import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

function ShowNumberVideos() {
	const creatorClass = useCreatorContext()

	const numberVideos = useMemo(() => {
		return creatorClass.myContent.length || 0
	}, [creatorClass.myContent])

	const numberOfUnlistedVideos = useMemo(() => {
		return creatorClass.numberOfUnlistedVideos || 0
	}, [creatorClass.numberOfUnlistedVideos])

	return (
		<div className="text-zinc-600 dark:text-zinc-300 text-sm">
			&nbsp;• {numberVideos} video{numberVideos === 1 ? "" : "s"}
			{numberOfUnlistedVideos > 0 && (
				<>
					&nbsp;({numberVideos - numberOfUnlistedVideos} listed, {numberOfUnlistedVideos} unlisted)
				</>
			)}
		</div>
	)
}

export default observer(ShowNumberVideos)
