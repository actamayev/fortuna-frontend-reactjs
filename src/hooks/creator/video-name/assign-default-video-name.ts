import _ from "lodash"
import { useCallback } from "react"
import { useCreatorContext } from "../../../contexts/creator-context"

export default function useAssignDefaultVideoName(): (
	videoUUID: string,
	setVideoName: (value: React.SetStateAction<string>) => void
) => void {
	const creatorClass = useCreatorContext()

	return useCallback((
		videoUUID: string,
		setVideoName: (value: React.SetStateAction<string>) => void
	): void => {
		try {
			const content = creatorClass.contextForMyContent(videoUUID)
			if (_.isUndefined(content)) return
			setVideoName(content.videoName)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass])
}
