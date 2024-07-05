import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import SingleLinkToSocialPlatform from "../../single-link-to-social-platform"

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
				<SingleLinkToSocialPlatform
					key={socialPlatformLink.socialPlatform}
					socialPlatformLink={socialPlatformLink}
				/>
			))}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
