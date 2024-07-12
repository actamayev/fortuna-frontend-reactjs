import _ from "lodash"
import { useObserver } from "mobx-react"
import { useCreatorContext } from "../../contexts/creator-context"

export default function useMyContentToShow(): MyContent[] {
	const creatorClass = useCreatorContext()

	return useObserver(() => {
		if (_.isNull(creatorClass)) return []

		let filteredContent = creatorClass.myContent

		// Filter by title
		if (!_.isEmpty(creatorClass.myContentFilter.titleIncludes)) {
			filteredContent = filteredContent.filter(content =>
				content.videoName.toLowerCase().includes(creatorClass.myContentFilter.titleIncludes.toLowerCase())
			)
		}

		if (creatorClass.myContentFilter.visibility !== "all") {
			filteredContent = filteredContent.filter(content => {
				if (creatorClass.myContentFilter.visibility === "listed") {
					return content.videoListingStatus === "LISTED" || content.videoListingStatus === "SOLDOUT"
				}
				return content.videoListingStatus === "UNLISTED"
			})
		}

		// Sort by date or earnings
		if (creatorClass.myContentFilter.sortBy === "Date") {
			filteredContent = filteredContent.slice().sort((a, b) =>
				creatorClass.myContentFilter.orderBy === "asc"
					? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
		} else {
			filteredContent = filteredContent.slice().sort((a, b) =>
				creatorClass.myContentFilter.orderBy === "asc"
					? a.totalCreatorProfitInUsd - b.totalCreatorProfitInUsd
					: b.totalCreatorProfitInUsd - a.totalCreatorProfitInUsd
			)
		}

		return filteredContent
	})
}
