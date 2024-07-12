import _ from "lodash"
import { useMemo } from "react"
import { useCreatorContext } from "../../contexts/creator-context"

export default function useMyContentToShow(): MyContent[] {
	const creatorClass = useCreatorContext()

	return useMemo(() => {
		if (_.isNull(creatorClass)) return []

		let filteredContent = creatorClass.myContent

		// Filter by title
		if (!_.isEmpty(creatorClass.myContentFilter.titleIncludes)) {
			filteredContent = filteredContent.filter(content =>
				content.videoName.toLowerCase().includes(creatorClass.myContentFilter.titleIncludes.toLowerCase())
			)
		}

		// Sort by date or earnings
		if (creatorClass.myContentFilter.sortBy === "Date") {
			filteredContent = filteredContent.slice().sort((a, b) =>
				creatorClass.myContentFilter.orderBy === "asc"
					? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else {
			filteredContent = filteredContent.slice().sort((a, b) =>
				creatorClass.myContentFilter.orderBy === "asc"
					? a.totalCreatorProfitInUsd - b.totalCreatorProfitInUsd
					: b.totalCreatorProfitInUsd - a.totalCreatorProfitInUsd
			)
		}

		return filteredContent
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContent, creatorClass?.myContentFilter])
}
