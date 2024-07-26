import { useMemo } from "react"
import { SocialPlatforms } from "../../../../../utils/platform-icons"
import SingleAvailableSocialLink from "./single-available-social-link"

interface Props {
	tempSocialLinks: SocialPlatformLinks[]
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

export default function AvailableLinks(props: Props) {
	const { tempSocialLinks, setTempSocialLinks } = props

	const availablePlatforms = useMemo(() => {
		const tempSocialPlatforms = tempSocialLinks.map(link => link.socialPlatform)
		return Object.keys(SocialPlatforms).filter(platform =>
			!tempSocialPlatforms.includes(platform as SocialPlatformKey)
		) as SocialPlatformKey[]
	}, [tempSocialLinks])

	return (
		<div className="flex flex-wrap items-center justify-center">
			{availablePlatforms.map(platform => (
				<SingleAvailableSocialLink
					key={platform}
					socialPlatform={platform}
					setTempSocialLinks={setTempSocialLinks}
				/>
			))}
		</div>
	)
}
