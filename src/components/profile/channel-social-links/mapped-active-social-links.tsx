import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleActivePlatformLink from "./single-active-platform-link"
import { useCreatorContext } from "../../../contexts/creator-context"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()

	const socialPlatformLinks = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.socialPlatformLinks
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.socialPlatformLinks])

	return (
		<div className="flex">
			{socialPlatformLinks.map(socialPlatformLink => (
				<SingleActivePlatformLink
					key={socialPlatformLink.socialPlatform}
					socialPlatformLink={socialPlatformLink}
				/>
			))}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
