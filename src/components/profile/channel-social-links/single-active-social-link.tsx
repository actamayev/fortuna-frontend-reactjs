import _ from "lodash"
import { FaTrashAlt } from "react-icons/fa"
import platformIcons from "../../../utils/platform-icons"
import HoverOutlineComponent from "../../hover-outline-component"
import useRemoveSocialLink from "../../../hooks/creator/social-links/remove-social-link"
import useAddOrEditSocialLink from "../../../hooks/creator/social-links/add-or-edit-social-link"

interface Props {
	link: SocialPlatformLinks
	tempSocialLinks: SocialPlatformLinks[]
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

export default function SingleActiveSocialLink(props: Props) {
	const { link, tempSocialLinks, setTempSocialLinks } = props
	const removeSocialLink = useRemoveSocialLink()
	const addOrEditSocialLink = useAddOrEditSocialLink()

	const debouncedAddOrEditSocialLink = _.debounce((socialLink: string, socialPlatform: SocialPlatformKey) => {
		addOrEditSocialLink(socialLink, socialPlatform)
	}, 2000)

	const handleInputChange = (socialPlatform: SocialPlatformKey, value: string) => {
		setTempSocialLinks(prevLinks =>
			prevLinks.map(prevLink =>
				prevLink.socialPlatform === socialPlatform
					? { ...prevLink, socialLink: value }
					: prevLink
			)
		)
		debouncedAddOrEditSocialLink(value, socialPlatform)
	}

	const IconComponent = platformIcons[link.socialPlatform as SocialPlatformKey]

	return (
		<div key={link.socialPlatform} className="flex items-center mb-2">
			<IconComponent className="mr-2" size={24} />
			<input
				type="text"
				value={link.socialLink}
				className="flex-1 border p-1 rounded"
				onChange={e => handleInputChange(link.socialPlatform, e.target.value)}
			/>
			{tempSocialLinks.some(tempLink => tempLink.socialPlatform === link.socialPlatform) && (
				<HoverOutlineComponent
					classes="relative flex items-center justify-center inline-block ml-1"
					onClickAction={() => removeSocialLink(link.socialPlatform, setTempSocialLinks)}
				>
					<FaTrashAlt />
				</HoverOutlineComponent>
			)}
		</div>
	)

}
