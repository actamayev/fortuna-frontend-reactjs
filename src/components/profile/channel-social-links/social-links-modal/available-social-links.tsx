import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { SocialPlatforms } from "../../../../utils/platform-icons"
import SingleAvailableSocialLink from "./single-available-social-link"
import { useCreatorContext } from "../../../../contexts/creator-context"

interface Props {
	tempSocialLinks: SocialPlatformLinks[]
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

function AvailableLinks(props: Props) {
	const { tempSocialLinks, setTempSocialLinks } = props
	const creatorClass = useCreatorContext()

	const availablePlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		const tempSocialPlatforms = tempSocialLinks.map(link => link.socialPlatform)
		return Object.keys(SocialPlatforms).filter(platform =>
			!tempSocialPlatforms.includes(platform as SocialPlatformKey)
		) as SocialPlatformKey[]
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tempSocialLinks, creatorClass?.socialPlatformLinks])

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

export default observer(AvailableLinks)
