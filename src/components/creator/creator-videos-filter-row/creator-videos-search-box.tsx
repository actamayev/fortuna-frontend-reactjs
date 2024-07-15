import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useVideoContext } from "../../../contexts/video-context"

function CreatorVideosSearchBox() {
	const videosClass = useVideoContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		videosClass.updateCreatorVideosFilter("titleIncludes", event.target.value)
	}, [videosClass])

	const titleIncludes = useMemo(() => {
		if (_.isNull(videosClass)) return ""
		return videosClass.creatorVideosFilter.titleIncludes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videosClass, videosClass.creatorVideosFilter.titleIncludes])

	return (
		<input
			type="text"
			placeholder="Title contains..."
			value={titleIncludes}
			onChange={handleSearch}
			className="w-full outline-none bg-inherit"
		/>
	)
}

export default observer(CreatorVideosSearchBox)
