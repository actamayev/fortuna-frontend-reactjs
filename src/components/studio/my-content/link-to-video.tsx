import { observer } from "mobx-react"
import { PiVideoFill } from "react-icons/pi"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	content: MyContent
}

function LinkToVideo(props: Props) {
	const { content } = props
	const navigateToVideo = useNavigateToVideoPage()

	return (
		<div
			className="cursor-pointer rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 items-center flex justify-center"
			onClick={() => navigateToVideo(content.uuid)}
		>
			<PiVideoFill size={40}/>
		</div>
	)
}

export default observer(LinkToVideo)
