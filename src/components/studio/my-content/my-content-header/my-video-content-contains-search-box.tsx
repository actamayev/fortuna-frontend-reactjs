import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useCreatorContext } from "../../../../contexts/creator-context"

function MyVideoContainsSearchBox() {
	const creatorClass = useCreatorContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateMyContentTitle(event.target.value)
	}, [creatorClass])

	const titleIncludes = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.myContentFilter.titleIncludes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.myContentFilter.titleIncludes])

	return (
		<div className="w-full">
			<input
				type="text"
				placeholder="Title contains..."
				value={titleIncludes}
				onChange={handleSearch}
				className="w-full outline-none bg-inherit"
			/>
		</div>
	)
}

export default observer(MyVideoContainsSearchBox)
