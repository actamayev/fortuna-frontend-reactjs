import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleActivePlatformLink from "./single-active-platform-link"
import { useCreatorContext } from "../../../contexts/creator-context"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()

	const activeSocialPlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.activeSocialPlatforms
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.activeSocialPlatforms])

	return (
		<div className="flex">
			{activeSocialPlatforms.map(platform => (
				<SingleActivePlatformLink
					key={platform}
					platform={platform}
				/>
			))}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
