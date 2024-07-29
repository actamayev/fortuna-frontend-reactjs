import { observer } from "mobx-react"
import { useCallback, useRef, useState } from "react"
import FormGroup from "../../form-group"
import Button from "../../buttons/button"
import ModalHeader from "../../modal-header"
import useReportVideo from "../../../hooks/videos/report-video"
import useClickOutsideModalUseEffect from "../../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
	video: UrlExtendedSingleVideoData
	toggleModalOpen: () => void
}

function ReportVideoModal(props: Props) {
	const { video, toggleModalOpen } = props
	const [reportMessage, setReportMessage] = useState("")
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	const maxLength = 300
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)
	const reportVideo = useReportVideo()

	const reportVideoCallback = useCallback(async() => {
		await reportVideo(video, reportMessage, toggleModalOpen)
	}, [reportMessage, reportVideo, toggleModalOpen, video])

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-2/3 max-h-full overflow-visible"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Report Title"
					toggleModalOpen={toggleModalOpen}
				/>
				<div className="p-3">
					<div className="flex flex-col">
						<div>
							<FormGroup
								label="Report Message"
								value={reportMessage}
								onChange={(event) => setReportMessage(event.target.value)}
								maxLength={maxLength}
								className="w-full"
								multiline={true}
								rows={3}
							/>
						</div>
						<div className="flex justify-between mt-2 items-center">
							<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
								{reportMessage.length}/{maxLength}
							</span>
							<Button
								title="Report video"
								colorClass="bg-blue-300 dark:bg-blue-600"
								hoverClass="hover:bg-blue-400 hover:dark:bg-blue-700"
								onClick={reportVideoCallback}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(ReportVideoModal)
