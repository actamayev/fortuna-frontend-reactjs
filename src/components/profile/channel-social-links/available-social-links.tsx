import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import platformIcons, { SocialPlatforms } from "../../../utils/platform-icons"

function AvailableLinks () {
	const creatorClass = useCreatorContext()
	const allPlatforms = Object.keys(SocialPlatforms) as Array<keyof typeof SocialPlatforms>

	const availablePlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		const activeSocialLinks = creatorClass.socialPlatformLinks.map(link => link.socialPlatform)
		return allPlatforms.filter(platform => !activeSocialLinks.includes(platform))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.socialPlatformLinks])

	return (
		<div>
			<div className="flex flex-wrap">
				{availablePlatforms.map(platform => {
					const IconComponent = platformIcons[platform]
					return (
						<div key={platform} className="flex items-center m-2">
							<IconComponent size={24} />
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default observer(AvailableLinks)
