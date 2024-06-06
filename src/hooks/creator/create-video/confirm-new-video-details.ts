import _ from "lodash"
import { useCreatorContext } from "../../../contexts/creator-context"

// Add tier requirements here
export default function useConfirmNewVideoDetails(): boolean {
	const creatorClass = useCreatorContext()

	if (
		_.isNull(creatorClass) ||
		_.isEmpty(creatorClass.newVideoDetails.videoName) ||
		_.isEmpty(creatorClass.newVideoDetails.description)
	) return false

	if (creatorClass.newVideoDetails.isContentExclusive === true) {
		if (_.isEmpty(creatorClass.newVideoDetails.tierData)) return false
	}
	return true
}
