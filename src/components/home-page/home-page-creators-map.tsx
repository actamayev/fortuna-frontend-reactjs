import { observer } from "mobx-react"
import { useVideoContext } from "../../contexts/video-context"
import SingleHomePageCreator from "./single-home-page-creator"

function HomePageCreatorsMap() {
	const videosClass = useVideoContext()

	return (
		<div className="text-zinc-950 dark:text-zinc-50">
			Popular Creators
			<div className="grid grid-cols-4 gap-3">
				{videosClass.homeScreenCreators.map(singleCreator => (
					<SingleHomePageCreator
						key={singleCreator.creatorUsername}
						singleHomePageCreator={singleCreator}
					/>
				))}
			</div>
		</div>
	)
}

export default observer(HomePageCreatorsMap)
