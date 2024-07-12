import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

function MyVideoContainsSearchBox() {
	const creatorClass = useCreatorContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateMyContentFilter("titleIncludes", event.target.value)
	}, [creatorClass])

	if (_.isNull(creatorClass)) return null

	return (
		<div className="w-full">
			<input
				type="text"
				placeholder="Title contains..."
				value={creatorClass.myContentFilter.titleIncludes}
				onChange={handleSearch}
				className="w-full outline-none"
			/>
		</div>
	)
}

export default observer(MyVideoContainsSearchBox)
