import _ from "lodash"
import { useCallback, useMemo } from "react"
import { observer } from "mobx-react"
import { FaTrashAlt } from "react-icons/fa"
import HoverOutlineComponent from "../../hover-outline-component"
import { useCreatorContext } from "../../../contexts/creator-context"
import platformIcons, { SocialPlatformKey } from "../../../utils/platform-icons"

interface Props {
    tempSocialLinks: SocialPlatformLinks[]
    setTempSocialLinks: (links: SocialPlatformLinks[]) => void
    handleRemoveLink: (updatedLink: SocialPlatformLinks) => void
}

function ActiveSocialLinks(props: Props) {
	const { tempSocialLinks, setTempSocialLinks, handleRemoveLink } = props
	const creatorClass = useCreatorContext()

	const activeSocialPlatforms = useMemo(() => {
		if (_.isNull(creatorClass)) return tempSocialLinks
		return tempSocialLinks.concat(creatorClass.socialPlatformLinks)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tempSocialLinks, creatorClass?.socialPlatformLinks])

	const handleDelete = useCallback((platform: string) => {
		//TODO: will need to figure out how to delete from the context or from the temp links, conditionally.
		setTempSocialLinks(tempSocialLinks.filter(link => link.socialPlatform !== platform))
	}, [setTempSocialLinks, tempSocialLinks])

	return (
		<div>
			{_.isEmpty(activeSocialPlatforms) && (
				<div className="text-sm font-medium mb-2">
					Click one of the icons below to add a social link
				</div>
			)}
			{activeSocialPlatforms.map((link: SocialPlatformLinks) => {
				const IconComponent = platformIcons[link.socialPlatform as SocialPlatformKey]
				return (
					<div key={link.socialPlatform} className="flex items-center mb-2">
						<IconComponent className="mr-2" size={24} />
						<input
							type="text"
							value={link.socialLink}
							className="flex-1 border p-1 rounded"
							onChange={(e) => handleRemoveLink({ ...link, socialLink: e.target.value })}
						/>
						{tempSocialLinks.some(tempLink => tempLink.socialPlatform === link.socialPlatform) && (
							<HoverOutlineComponent
								classes="relative flex items-center justify-center inline-block ml-1"
								onClickAction={() => handleDelete(link.socialPlatform)}
							>
								<FaTrashAlt />
							</HoverOutlineComponent>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default observer(ActiveSocialLinks)
