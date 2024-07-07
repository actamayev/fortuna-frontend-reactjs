import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import platformIcons from "../../../utils/platform-icons"
import { useCreatorContext } from "../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	const nonEmptySocialPlatformLinks = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.nonEmptySocialPlatformLinks
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.nonEmptySocialPlatformLinks])

	return (
		<div className="flex">
			{nonEmptySocialPlatformLinks.map(nonEmptySocialPlatformLink => {
				const IconComponent = platformIcons[nonEmptySocialPlatformLink.socialPlatform]
				return (
					<div key={nonEmptySocialPlatformLink.socialPlatform} className="mr-3">
						<IconComponent size={24} color={defaultSiteTheme === "light" ? "black" : "white"} />
					</div>
				)
			})}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
