import _ from "lodash"
import { useCallback } from "react"
import platformIcons from "../utils/platform-icons"
import HoverOutlineComponent from "./hover-outline-component"

interface Props {
	socialPlatformLink: SocialPlatformLinks
}

export default function SingleLinkToSocialPlatform(props: Props) {
	const { socialPlatformLink } = props

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
			classes="relative flex items-center justify-center right-2 bottom-2"
			onClickAction={handleClick}
		>
			<IconComponent size={24} />
		</HoverOutlineComponent>
	)
}
