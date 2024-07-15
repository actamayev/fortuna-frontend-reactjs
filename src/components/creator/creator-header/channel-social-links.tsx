import platformIcons from "../../../utils/platform-icons"
import HoverOutlineComponent from "../../hover-outline-component"
import useHandleClickExternalSocialLink from "../../../hooks/handle-click-external-social-url"

interface Props {
	socialPlatformLinks: SocialPlatformLinks[]
}

export default function ChannelSocialLinks(props: Props) {
	const { socialPlatformLinks } = props
	const handleClickExternalSocialLink = useHandleClickExternalSocialLink()

	return (
		<div className="flex">
			{socialPlatformLinks.map(socialPlatformLink => {
				const IconComponent = platformIcons[socialPlatformLink.socialPlatform]
				return (
					<div key={socialPlatformLink.socialPlatform}>
						<HoverOutlineComponent
							classes="relative flex items-center justify-center text-black dark:text-white"
							onClickAction={() => handleClickExternalSocialLink(socialPlatformLink.socialLink)}
						>
							<IconComponent size={24} />
						</HoverOutlineComponent>
					</div>
				)
			})}
		</div>
	)
}
