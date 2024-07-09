import _ from "lodash"
import { useCallback } from "react"
import { useCreatorContext } from "../../contexts/creator-context"

export default function useAssignDefaultVideoDescription(): (
	videoUUID: string,
	setVideoDescription: (value: React.SetStateAction<string>) => void
) => void {
	const creatorClass = useCreatorContext()

	const assignDefaultVideoDescription = useCallback((
		videoUUID: string,
		setVideoDescription: (value: React.SetStateAction<string>) => void
	): void => {
		try {
			if (_.isNull(creatorClass)) return
			const content = creatorClass.contextForMyContent(videoUUID)
			if (_.isUndefined(content)) return
			setVideoDescription(content.description)
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass])

	return assignDefaultVideoDescription
}
