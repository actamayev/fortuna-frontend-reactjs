import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"

interface Props {
	sortBy: CreatorContentSortByFields
}

function SortContentByArrow(props: Props) {
	const { sortBy } = props
	const creatorClass = useCreatorContext()

	const onClickAction = useCallback(() => {
		creatorClass.updateMyContentFilter(sortBy)
	}, [creatorClass, sortBy])

	const pointingUpOrDown = useMemo(() => {
		return creatorClass.myContentFilter.orderBy
	}, [creatorClass.myContentFilter.orderBy])

	const filterSortBy = useMemo(() => {
		return creatorClass.myContentFilter.sortBy
	}, [creatorClass.myContentFilter.sortBy])

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
