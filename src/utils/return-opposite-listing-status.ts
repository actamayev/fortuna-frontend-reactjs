export default function returnOppositeListingStatus(
	videoListingStatus: NonExclusiveVideoListingStatuses
): NonExclusiveVideoListingStatuses {
	try {
		if (videoListingStatus === "LISTED") return "UNLISTED"
		return "LISTED"
	} catch (error) {
		console.error(error)
		return "LISTED"
	}
}
