import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useCreatorContext } from "../../../../contexts/creator-context"

function MyVideoContainsSearchBox() {
	const creatorClass = useCreatorContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		creatorClass.updateMyContentFilterTitle(event.target.value)
	}, [creatorClass])

	const titleIncludes = useMemo(() => {
		return creatorClass.myContentFilter.titleIncludes
	}, [creatorClass.myContentFilter.titleIncludes])

	return (
		<input
			type="text"
			placeholder="Title contains..."
			value={titleIncludes}
			onChange={handleSearch}
			className="w-full outline-none bg-inherit"
		/>
	)
}

export default observer(MyVideoContainsSearchBox)
