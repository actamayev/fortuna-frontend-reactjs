import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import platformIcons, { SocialPlatformKey } from "../../../utils/platform-icons"

interface Props {
	tempSocialLinks: SocialPlatformLinks[]
	handleRemoveLink: (updatedLink: SocialPlatformLinks) => void
}

function ActiveSocialLinks(props: Props) {
	const { tempSocialLinks, handleRemoveLink } = props
	const creatorClass = useCreatorContext()

	const activeSocialPlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return tempSocialLinks
		return tempSocialLinks.concat(creatorClass.socialPlatformLinks)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tempSocialLinks, creatorClass?.socialPlatformLinks])

	return (
		<div>
			{_.isEmpty(activeSocialPlatforms) && (
				<div className="text-sm font-medium mb-2">
					Click one of the icons below to add a social link
				</div>
			)}
			{activeSocialPlatforms.map((link: SocialPlatformLinks) => {
				const IconComponent = platformIcons[link.socialPlatform as SocialPlatformKey]
				return (
					<div key={link.socialPlatform} className="flex items-center mb-2">
						<IconComponent className="mr-2" />
						<input
							type="text"
							value={link.socialLink}
							className="flex-1 border p-1 rounded"
							onChange={(e) => handleRemoveLink({ ...link, socialLink: e.target.value })}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default observer(ActiveSocialLinks)
