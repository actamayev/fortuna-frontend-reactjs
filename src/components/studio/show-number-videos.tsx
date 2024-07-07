import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../contexts/creator-context"

function ShowNumberVideos() {
	const creatorClass = useCreatorContext()

	const numberVideos = useMemo(() => {
		return creatorClass?.myContent.length || 0
	}, [creatorClass?.myContent])

	return (
		<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
			• {numberVideos} videos
		</div>
	)
}

export default observer(ShowNumberVideos)
