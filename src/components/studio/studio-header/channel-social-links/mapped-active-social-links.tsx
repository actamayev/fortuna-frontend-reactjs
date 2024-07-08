import _ from "lodash"
import { observer } from "mobx-react"
import { FaPlusCircle } from "react-icons/fa"
import platformIcons from "../../../../utils/platform-icons"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="flex">
			{(_.isNil(creatorClass?.nonEmptySocialPlatformLinks) || _.isEmpty(creatorClass.nonEmptySocialPlatformLinks)) ? (
				<FaPlusCircle
					size={24}
					color={defaultSiteTheme === "light" ? "black" : "white"}
				/>
			) : (
				<>
					{creatorClass.nonEmptySocialPlatformLinks.map(nonEmptySocialPlatformLink => {
						const IconComponent = platformIcons[nonEmptySocialPlatformLink.socialPlatform]
						return (
							<div key={nonEmptySocialPlatformLink.socialPlatform} className="mx-1">
								<IconComponent
									size={24}
									color={defaultSiteTheme === "light" ? "black" : "white"}
								/>
							</div>
						)
					})}
				</>
			)}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
