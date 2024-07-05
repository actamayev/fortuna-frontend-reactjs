import { useCallback } from "react"
import platformIcons from "../../../../utils/platform-icons"
import HoverOutlineComponent from "../../../hover-outline-component"

interface Props {
	socialPlatform: SocialPlatformKey
	tempSocialLinks: SocialPlatformLinks[]
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

export default function SingleAvailableSocialLink(props: Props) {
	const { socialPlatform, tempSocialLinks, setTempSocialLinks } = props

	const handleAddTempLink = useCallback(() => {
		setTempSocialLinks([...tempSocialLinks, { socialPlatform, socialLink: "" }])
	}, [setTempSocialLinks, socialPlatform, tempSocialLinks])

	const IconComponent = platformIcons[socialPlatform]

	return (
		<HoverOutlineComponent
			key={socialPlatform}
			classes="relative flex items-center justify-center inline-block"
			onClickAction={handleAddTempLink}
		>
			<IconComponent size={24} />
		</HoverOutlineComponent>
	)
}
