import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import platformIcons, { SocialPlatformKey, SocialPlatforms } from "../../../utils/platform-icons"

interface Props {
	tempSocialLinks: SocialPlatformLinks[]
	handleAddLink: (platform: SocialPlatformKey) => void
}

function AvailableLinks (props: Props) {
	const { tempSocialLinks, handleAddLink } = props
	const creatorClass = useCreatorContext()

	const availablePlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		const activeSocialPlatforms = creatorClass.socialPlatformLinks.map(link => link.socialPlatform)
		const tempSocialPlatforms = tempSocialLinks.map(link => link.socialPlatform)
		return Object.keys(SocialPlatforms).filter(platform =>
			!activeSocialPlatforms.includes(platform as SocialPlatformKey) &&
            !tempSocialPlatforms.includes(platform as SocialPlatformKey)
		) as SocialPlatformKey[]
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tempSocialLinks, creatorClass?.socialPlatformLinks])

	return (
		<div className="flex flex-wrap">
			{availablePlatforms.map(platform => {
				const IconComponent = platformIcons[platform]
				return (
					<div
						key={platform}
						className="flex items-center m-2 cursor-pointer"
						onClick={() => handleAddLink(platform)}
					>
						<IconComponent size={24} />
					</div>
				)
			})}
		</div>
	)
}

export default observer(AvailableLinks)
