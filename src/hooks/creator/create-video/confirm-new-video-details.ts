import _ from "lodash"
import { useCreatorContext } from "../../../contexts/creator-context"

export default function useConfirmNewVideoDetails(): boolean {
	const creatorClass = useCreatorContext()

	if (
		_.isNull(creatorClass) ||
		_.isEmpty(creatorClass.newVideoDetails.videoName) ||
		_.isEqual(creatorClass.newVideoDetails.listingPriceToAccessUsd, 0) ||
		_.isEmpty(creatorClass.newVideoDetails.description)
	) return false
	return true
}
