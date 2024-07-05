import _ from "lodash"
import SingleActiveSocialLink from "./single-active-social-link"

interface Props {
    tempSocialLinks: SocialPlatformLinks[]
    setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

export default function ActiveSocialLinks(props: Props) {
	const { tempSocialLinks, setTempSocialLinks } = props

	return (
		<div>
			{_.isEmpty(tempSocialLinks) && (
				<div className="text-sm font-medium mb-2">
					Click one of the icons below to add a social link
				</div>
			)}
			{tempSocialLinks.map((link: SocialPlatformLinks) => (
				<SingleActiveSocialLink
					key={link.socialPlatform}
					link={link}
					setTempSocialLinks={setTempSocialLinks}
				/>
			))}
		</div>
	)
}
