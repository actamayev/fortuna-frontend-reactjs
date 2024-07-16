import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useVideoContext } from "../../../contexts/video-context"

function CreatorVideosSearchBox() {
	const videosClass = useVideoContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		videosClass.updateCreatorVideosFilter("titleIncludes", event.target.value)
	}, [videosClass])

	const titleIncludes = useMemo(() => {
		return videosClass.creatorVideosFilter.titleIncludes
	}, [videosClass.creatorVideosFilter.titleIncludes])

	return (
		<div className="w-full bg-inherit flex items-center justify-center">
			<input
				type="text"
				placeholder="Title contains..."
				value={titleIncludes}
				onChange={handleSearch}
				className="outline-none bg-inherit p-2"
			/>
		</div>
	)
}

export default observer(CreatorVideosSearchBox)
