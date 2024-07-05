import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaTrashAlt } from "react-icons/fa"
import platformIcons from "../../../../utils/platform-icons"
import HoverOutlineComponent from "../../../hover-outline-component"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useRemoveSocialLink from "../../../../hooks/creator/social-links/remove-social-link"
import useAddOrEditSocialLink from "../../../../hooks/creator/social-links/add-or-edit-social-link"

interface Props {
	link: SocialPlatformLinks
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
}

function SingleActiveSocialLink(props: Props) {
	const { link, setTempSocialLinks } = props
	const removeSocialLink = useRemoveSocialLink()
	const addOrEditSocialLink = useAddOrEditSocialLink()
	const creatorClass = useCreatorContext()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedAddOrEditSocialLink = useCallback(
		_.debounce((socialLink: string, socialPlatform: SocialPlatformKey) => {
			addOrEditSocialLink(socialLink, socialPlatform)
		}, 2000),
		[addOrEditSocialLink]
	)

	const handleInputChange = useCallback((socialPlatform: SocialPlatformKey, value: string) => {
		setTempSocialLinks(prevLinks =>
			prevLinks.map(prevLink =>
				prevLink.socialPlatform === socialPlatform
					? { ...prevLink, socialLink: value }
					: prevLink
			)
		)
		if (_.isNull(creatorClass)) return
		creatorClass.addSocialPlatformLink({ socialLink: value, socialPlatform })
		debouncedAddOrEditSocialLink(value, socialPlatform)
	}, [creatorClass, debouncedAddOrEditSocialLink, setTempSocialLinks])

	const IconComponent = platformIcons[link.socialPlatform as SocialPlatformKey]

	return (
		<div key={link.socialPlatform} className="flex items-center mb-2">
			<IconComponent className="mr-3" size={24} />
			<input
				type="text"
				value={link.socialLink}
				className="flex-1 border p-1 rounded text-zinc-950 border-zinc-100 dark:border-zinc-700 \
					dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none w-5/6"
				onChange={e => handleInputChange(link.socialPlatform, e.target.value)}
			/>
			<HoverOutlineComponent
				classes="relative flex items-center justify-center inline-block ml-1"
				onClickAction={() => removeSocialLink(link.socialPlatform, setTempSocialLinks)}
			>
				<FaTrashAlt />
			</HoverOutlineComponent>
		</div>
	)

}

export default observer(SingleActiveSocialLink)
