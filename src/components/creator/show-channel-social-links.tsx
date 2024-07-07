import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import platformIcons from "../../utils/platform-icons"
import HoverOutlineComponent from "../hover-outline-component"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

interface Props {
	socialPlatformLinks: SocialPlatformLinks[]
}

function ShowChannelSocialLinks(props: Props) {
	const { socialPlatformLinks } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	const handleClick = useCallback((socialLink: string) => {
		if (_.isEmpty(socialLink)) return
		const url = socialLink.startsWith("http")
			? socialLink
			: `http://${socialLink}`
		window.open(url, "_blank")
	}, [])

	return (
		<div className="flex">
			{socialPlatformLinks.map(socialPlatformLink => {
				const IconComponent = platformIcons[socialPlatformLink.socialPlatform]
				return (
					<div key={socialPlatformLink.socialPlatform}>
						<HoverOutlineComponent
							classes="relative flex items-center justify-center"
							onClickAction={() => handleClick(socialPlatformLink.socialLink)}
						>
							<IconComponent size={24} color={defaultSiteTheme === "light" ? "black" : "white"} />
						</HoverOutlineComponent>
					</div>
				)
			})}
		</div>
	)
}

export default observer(ShowChannelSocialLinks)
