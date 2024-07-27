import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaPlusCircle } from "react-icons/fa"
import platformIcons from "../../../../utils/platform-icons"
import { useCreatorContext } from "../../../../contexts/creator-context"

function MappedActiveSocialLinks() {
	const creatorClass = useCreatorContext()

	const nonEmptySocialPlatformLinks = useMemo(() => {
		return creatorClass.nonEmptySocialPlatformLinks
	}, [creatorClass.nonEmptySocialPlatformLinks])

	return (
		<div className="flex text-black dark:text-white">
			{(_.isEmpty(nonEmptySocialPlatformLinks)) ? (
				<FaPlusCircle size={24} />
			) : (
				<>
					{nonEmptySocialPlatformLinks.map(nonEmptySocialPlatformLink => {
						const IconComponent = platformIcons[nonEmptySocialPlatformLink.socialPlatform]
						return (
							<div key={nonEmptySocialPlatformLink.socialPlatform} className="mx-1">
								<IconComponent size={24} />
							</div>
						)
					})}
				</>
			)}
		</div>
	)
}

export default observer(MappedActiveSocialLinks)
