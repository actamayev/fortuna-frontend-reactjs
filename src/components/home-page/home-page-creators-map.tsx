import { observer } from "mobx-react"
import { useVideoContext } from "../../contexts/video-context"
import SingleHomePageCreator from "./single-home-page-creator"

function HomePageCreatorsMap() {
	const videosClass = useVideoContext()

	return (
		<div className="text-zinc-950 dark:text-zinc-50 w-full">
			<div className="mt-4 mb-2">Popular Creators</div>
			<div className="grid grid-cols-4 gap-2">
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
