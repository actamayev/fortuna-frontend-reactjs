import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import SingleLinkToSocialPlatform from "../../single-link-to-social-platform"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()

	const nonEmptySocialPlatformLinks = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.nonEmptySocialPlatformLinks
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.nonEmptySocialPlatformLinks])

	return (
		<div className="flex">
			{nonEmptySocialPlatformLinks.map(nonEmptySocialPlatformLink => (
				<SingleLinkToSocialPlatform
					key={nonEmptySocialPlatformLink.socialPlatform}
					socialPlatformLink={nonEmptySocialPlatformLink}
				/>
			))}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
