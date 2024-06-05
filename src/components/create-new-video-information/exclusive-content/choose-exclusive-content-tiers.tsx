import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

function ChooseExclusiveContentTiers() {
	const creatorClass = useCreatorContext()

	return (
		<>Content Tiers</>
	)
}

export default observer(ChooseExclusiveContentTiers)
