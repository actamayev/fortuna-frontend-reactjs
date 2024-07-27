import _ from "lodash"
import { observer } from "mobx-react"
import { FaThumbtack } from "react-icons/fa"
import { useCallback, useMemo } from "react"
import useFeatureVideo from "../../../../hooks/creator/feature-video"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useUnfeatureVideo from "../../../../hooks/creator/unfeature-video"

interface Props {
	videoId: number
}

function FeaturedContentButton(props: Props) {
	const { videoId } = props
	const creatorClass = useCreatorContext()
	const featureVideo = useFeatureVideo()
	const unfeatureVideo = useUnfeatureVideo()

	const isContentFeatured = useMemo(() => {
		return _.isEqual(creatorClass.featuredContentId, videoId)
	}, [creatorClass.featuredContentId, videoId])

	const featureVideoCallback = useCallback(async () => {
		if (isContentFeatured === true) {
			await unfeatureVideo()
			return
		}
		await featureVideo(videoId)
	}, [featureVideo, isContentFeatured, unfeatureVideo, videoId])

	const colorClasses = useMemo(() => {
		const baseClass = "absolute bottom-2 left-2 p-1 cursor-pointer rounded"
		const activeClass = "text-black bg-white"
		const inactiveClass = "text-zinc-200 bg-black hover:text-white"

		return isContentFeatured ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
	}, [isContentFeatured])

	return (
		<div
			className={colorClasses}
			onClick={featureVideoCallback}
			style={{
				fontSize: "10px",
				lineHeight: "13px"
			}}
		>
			<div className="flex flex-row items-center space-x-1">
				<FaThumbtack />
				{isContentFeatured && (<div>Featured</div>)}
			</div>
		</div>
	)
}

export default observer(FeaturedContentButton)
