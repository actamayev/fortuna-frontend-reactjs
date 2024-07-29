import _ from "lodash"
import { observer } from "mobx-react"
import { IoFlag } from "react-icons/io5"
import { useCallback, useState } from "react"
import ReportVideoModal from "./report-video-modal"
import { useAuthContext } from "../../../contexts/auth-context"
import HoverOutlineComponent from "../../hover-outline-component"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import HoverNotAllowedComponent from "../../hover-not-allowed-component"
import useEscapeListenerUseEffect from "../../../hooks/listeners/escape-key-listener-use-effect"

interface Props {
	video: UrlExtendedSingleVideoData
}

function ReportVideoButton(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	useEscapeListenerUseEffect(isModalOpen, () => setIsModalOpen(false))

	const reportVideoCallback = useCallback(() => {
		if (authClass.isLoggedIn === false) {
			navigate("/register")
			return
		}
		setIsModalOpen(true)
	}, [authClass.isLoggedIn, navigate])

	const toggleModalOpen = useCallback(() => setIsModalOpen(prev => !prev), [])

	if (_.isUndefined(video.videoUrl)) {
		return (
			<HoverNotAllowedComponent>
				<IoFlag size={22}/>
			</HoverNotAllowedComponent>
		)
	}

	return (
		<>
			<HoverOutlineComponent
				classes="flex items-center justify-center"
				onClickAction={reportVideoCallback}
			>
				<IoFlag size={22}/>
			</HoverOutlineComponent>
			{isModalOpen && (
				<ReportVideoModal
					video={video}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
		</>
	)
}

export default observer(ReportVideoButton)
