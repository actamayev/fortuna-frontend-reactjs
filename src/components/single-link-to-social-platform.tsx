import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import platformIcons from "../utils/platform-icons"
import HoverOutlineComponent from "./hover-outline-component"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

interface Props {
	socialPlatformLink: SocialPlatformLinks
}

function SingleLinkToSocialPlatform(props: Props) {
	const { socialPlatformLink } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	const IconComponent = platformIcons[socialPlatformLink.socialPlatform]

	const handleClick = useCallback(() => {
		if (_.isEmpty(socialPlatformLink.socialLink)) return
		const url = socialPlatformLink.socialLink.startsWith("http")
			? socialPlatformLink.socialLink
			: `http://${socialPlatformLink.socialLink}`
		window.open(url, "_blank")
	}, [socialPlatformLink.socialLink])

	return (
		<HoverOutlineComponent
			classes="relative flex items-center justify-center"
			onClickAction={handleClick}
		>
			<IconComponent size={24} color={defaultSiteTheme === "light" ? "black" : "white"} />
		</HoverOutlineComponent>
	)
}

export default observer(SingleLinkToSocialPlatform)
