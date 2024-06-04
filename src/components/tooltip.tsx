import _ from "lodash"
import React, { useState, useEffect, useCallback } from "react"

interface Props {
	message: string
	children: React.ReactNode
	width?: string
	messageStart: "center" | "left"
}

export default function Tooltip(props: Props) {
	const { message, width, children, messageStart } = props
	const [isVisible, setIsVisible] = useState(false)
	const [timeoutId, setTimeoutId] = useState<number | null>(null)

	const showTooltip = useCallback(() => {
		if (!_.isNull(timeoutId)) {
			clearTimeout(timeoutId)
			setTimeoutId(null)
		}
		setIsVisible(true)
	}, [timeoutId])

	const hideTooltip = useCallback(() => {
		const id = setTimeout(() => {
			setIsVisible(false)
		}, 150)
		setTimeoutId(id as unknown as number)
	}, [])

	useEffect(() => {
		return () => {
			if (!_.isNull(timeoutId)) {
				clearTimeout(timeoutId)
			}
		}
	}, [timeoutId])

	let styles
	if (messageStart === "center") {
		styles = "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 flex items-center justify-center \
			p-1.5 bg-white text-zinc-950 text-sm rounded-md shadow-lg whitespace-normal max-w-sm min-w-max border border-zinc-300"
	} else {
		styles = "absolute bottom-full right-0 mb-1 flex items-center justify-center \
			p-1.5 bg-white text-zinc-950 text-sm rounded-md shadow-lg whitespace-normal max-w-sm min-w-max border border-zinc-300"
	}

	return (
		<div
			className="relative flex items-center group z-10"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			<div className="cursor-pointer">{children}</div>
			{isVisible && (
				<div
					className={styles}
					style={{ width: width || "auto", minWidth: "10rem" }}
					onMouseEnter={showTooltip}
					onMouseLeave={hideTooltip}
				>
					{message}
				</div>
			)}
		</div>
	)
}
