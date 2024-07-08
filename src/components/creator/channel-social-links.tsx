import { observer } from "mobx-react"
import platformIcons from "../../utils/platform-icons"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import useHandleClickExternalSocialLink from "../../hooks/handle-click-external-social-url"

interface Props {
	socialPlatformLinks: SocialPlatformLinks[]
}

function ChannelSocialLinks(props: Props) {
	const { socialPlatformLinks } = props
	const defaultSiteTheme = useDefaultSiteTheme()
	const handleClickExternalSocialLink = useHandleClickExternalSocialLink()

	return (
		<div className="flex">
			{socialPlatformLinks.map(socialPlatformLink => {
				const IconComponent = platformIcons[socialPlatformLink.socialPlatform]
				return (
					<div key={socialPlatformLink.socialPlatform}>
						<HoverOutlineComponent
							classes="relative flex items-center justify-center"
							onClickAction={() => handleClickExternalSocialLink(socialPlatformLink.socialLink)}
						>
							<IconComponent size={24} color={defaultSiteTheme === "light" ? "black" : "white"} />
						</HoverOutlineComponent>
					</div>
				)
			})}
		</div>
	)
}

export default observer(ChannelSocialLinks)
