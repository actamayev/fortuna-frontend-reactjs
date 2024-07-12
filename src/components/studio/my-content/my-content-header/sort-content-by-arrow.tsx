import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"

interface Props {
	sortBy: SortByFields
}

function SortContentByArrow(props: Props) {
	const { sortBy } = props
	const creatorClass = useCreatorContext()

	const onClickAction = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateMyContentFilter(sortBy)
	}, [creatorClass, sortBy])

	const pointingUpOrDown = useMemo(() => {
		if (_.isNull(creatorClass)) return "desc"
		return creatorClass.myContentFilter.orderBy
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContentFilter.orderBy])

	const filterSortBy = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.myContentFilter.sortBy
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContentFilter.sortBy])

	return (
		<div
			className={`flex items-center cursor-pointer dark:hover:text-white hover:text-zinc-900
				${filterSortBy === sortBy ? "dark:text-white text-zinc-900 font-medium" : ""}`}
			onClick={onClickAction}
		>
			{sortBy}
			{filterSortBy === sortBy && (
				<div className="relative items-center justify-center text-black dark:text-white ml-2">
					{pointingUpOrDown === "desc" ?
						<FaArrowDown /> :
						<FaArrowUp />}
				</div>
			)}
		</div>
	)
}

export default observer(SortContentByArrow)
