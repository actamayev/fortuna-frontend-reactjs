import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"

function VisbilityHeader() {
	const creatorClass = useCreatorContext()

	const onClickAction = useCallback(() => {
		creatorClass.updateVisibilityFilter()
	}, [creatorClass])

	const currentVisbilityFilter = useMemo(() => {
		return creatorClass.myContentFilter.visibility
	}, [creatorClass.myContentFilter.visibility])

	return (
		<div
			className={`flex items-center cursor-pointer dark:hover:text-white hover:text-zinc-900
				${currentVisbilityFilter !== "all" ? "dark:text-white text-zinc-900 font-medium" : ""}`}
			onClick={onClickAction}
		>
			Visibility
			{currentVisbilityFilter === "listed" && (
				<div className="relative items-center justify-center text-black dark:text-white ml-2">
					<FaEye color="green" size={20} />
				</div>
			)}
			{currentVisbilityFilter === "unlisted" && (
				<div className="relative items-center justify-center text-black dark:text-white ml-2">
					<FaEyeSlash size={20} />
				</div>
			)}
		</div>
	)
}

export default observer(VisbilityHeader)
