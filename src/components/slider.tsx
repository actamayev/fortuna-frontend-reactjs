import { useState, useRef, useCallback } from "react"

interface Props {
	checkedCondition: boolean | undefined
	onChangeCheckedCondition: React.ChangeEventHandler<HTMLInputElement> | undefined
	whatToShow?: string
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
}

export default function Slider(props: Props) {
	const { checkedCondition, onChangeCheckedCondition, whatToShow, disabledCondition, colorChangeOnToggle } = props
	const [isHovered, setIsHovered] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = useCallback(() => {
		if (!inputRef.current || disabledCondition) return
		inputRef.current.click()
	}, [disabledCondition])

	return (
		<>
			<div
				className="relative"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={handleClick}
				style={{
					width: "40px",
					height: "40px",
					position: "relative",
					display: "inline-block",
					backgroundColor: isHovered ? "rgba(128, 128, 128, 0.2)" : "transparent",
					borderRadius: "50%",
					cursor: "pointer"
				}}
			>
				<label
					className="relative inline-block"
					style={{
						width: "30px",
						height: "17px",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<input
						ref={inputRef}
						type="checkbox"
						checked={checkedCondition}
						onChange={onChangeCheckedCondition}
						disabled={disabledCondition}
						style={{ opacity: 0, width: 0, height: 0 }}
					/>
					<span
						className="absolute cursor-pointer inset-0 transition"
						style={{
							backgroundColor: "#ccc",
							borderRadius: "17px",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							transition: ".05s"
						}}
					/>
					<span
						className={
							`absolute rounded-full transition-transform \
              					${colorChangeOnToggle && checkedCondition ? "bg-blue-600" : "bg-white"}`
						}
						style={{
							height: "13px",
							width: "13px",
							left: "2px",
							bottom: "2px",
							transform: checkedCondition ? "translateX(13px)" : "translateX(0)",
							transition: ".05s",
							borderRadius: "50%"
						}}
					/>
				</label>
			</div>
			{whatToShow && (
				<span className="text-sm font-medium text-zinc-900">
					{whatToShow}
				</span>
			)}
		</>
	)
}
