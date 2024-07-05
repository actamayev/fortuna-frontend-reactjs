import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import platformIcons, { SocialPlatformKey } from "../../../utils/platform-icons"

function ActiveSocialLinks() {
	const creatorClass = useCreatorContext()

	const activeSocialPlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.socialPlatformLinks
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.socialPlatformLinks])

	return (
		<div>
			{_.isEmpty(activeSocialPlatforms) && (
				<div className="text-sm font-medium mb-2">
					Click one of the icons below to add a social link
				</div>
			)}
			{activeSocialPlatforms.map((activeSocialPlatform: SocialPlatformLinks) => {
				const IconComponent = platformIcons[activeSocialPlatform.socialPlatform as SocialPlatformKey]
				return (
					<div key={activeSocialPlatform.socialPlatform} className="flex items-center mb-2">
						<IconComponent className="mr-2" />
						<input
							type="text"
							value={activeSocialPlatform.socialLink}
							className="flex-1 border p-1 rounded"
							readOnly
						/>
					</div>
				)
			})}
		</div>
	)
}

export default observer(ActiveSocialLinks)
