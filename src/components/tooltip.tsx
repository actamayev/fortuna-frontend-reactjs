import _ from "lodash"
import React, { useState, useEffect } from "react"

interface Props {
	message: string
	width?: string
	children: React.ReactNode
}

export default function Tooltip(props: Props) {
	const { message, width, children } = props
	const [isVisible, setIsVisible] = useState(false)
	const [timeoutId, setTimeoutId] = useState<number | null>(null)

	const showTooltip = () => {
		if (!_.isNull(timeoutId)) {
			clearTimeout(timeoutId)
			setTimeoutId(null)
		}
		setIsVisible(true)
	}

	const hideTooltip = () => {
		const id = setTimeout(() => {
			setIsVisible(false)
		}, 200)
		setTimeoutId(id as unknown as number)
	}

	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [timeoutId])

	return (
		<div
			className="ml-2 relative flex items-center group"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			<div className="cursor-pointer">{children}</div>
			{isVisible && (
				<div
					className="absolute bottom-full right-0 mb-1 flex items-center justify-center \
          				p-1.5 bg-white text-black text-sm rounded-md shadow-lg whitespace-normal max-w-sm min-w-max border border-gray-300"
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
