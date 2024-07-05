import { observer } from "mobx-react"
import SingleLinkToSocialPlatform from "../profile/channel-social-links/single-link-to-social-platform"

interface Props {
	socialPlatformLinks: SocialPlatformLinks[]
}

function ShowChannelSocialLinks(props: Props) {
	const { socialPlatformLinks } = props

	return (
		<div className="flex mt-2">
			{socialPlatformLinks.map(socialPlatformLink => (
				<SingleLinkToSocialPlatform
					key={socialPlatformLink.socialPlatform}
					socialPlatformLink={socialPlatformLink}
				/>
			))}
		</div>
	)
}

export default observer(ShowChannelSocialLinks)
