import { useMemo } from "react"
import { observer } from "mobx-react"
import { useFormatDuration } from "../hooks/date-formatter"

interface Props {
	videoDurationSeconds: number
}

function VideoDurationSticker(props: Props) {
	const { videoDurationSeconds } = props
	const formatDuration = useFormatDuration()

	const formattedDuration = useMemo(() => {
		return formatDuration(videoDurationSeconds)
	}, [formatDuration, videoDurationSeconds])

	return (
		<div
			className="absolute bottom-2 right-2 text-white font-semibold py-0.5 px-1 rounded"
			style={{
				fontSize: "10px",
				lineHeight: "13px",
				backgroundColor: "rgba(0, 0, 0, 0.85)"
			}}
		>
			{formattedDuration}
		</div>
	)
}

export default observer(VideoDurationSticker)
