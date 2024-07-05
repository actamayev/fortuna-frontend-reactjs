import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleActiveSocialLink from "./single-active-social-link"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
    tempSocialLinks: SocialPlatformLinks[]
    setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

function ActiveSocialLinks(props: Props) {
	const { tempSocialLinks, setTempSocialLinks } = props
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
			{activeSocialPlatforms.map((link: SocialPlatformLinks) => (
				<SingleActiveSocialLink
					key={link.socialPlatform}
					link={link}
					tempSocialLinks={tempSocialLinks}
					setTempSocialLinks={setTempSocialLinks}
				/>
			)
			)}
		</div>
	)
}

export default observer(ActiveSocialLinks)
