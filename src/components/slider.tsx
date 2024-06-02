import { useState, useRef, useCallback } from "react"

interface Props {
	checkedCondition: boolean | undefined
	onChangeCheckedCondition: () => void
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
}

export default function Slider(props: Props) {
	const { checkedCondition, onChangeCheckedCondition, disabledCondition, colorChangeOnToggle, leftIcon, rightIcon } = props
	const [isHovered, setIsHovered] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = useCallback(() => {
		if (!inputRef.current || disabledCondition) return
		inputRef.current.click()
		onChangeCheckedCondition()
	}, [disabledCondition, onChangeCheckedCondition])

	return (
		<>
			<div
				className="relative cursor-pointer"
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
					cursor: "pointer",
				}}
			>
				<label
					className="relative inline-block cursor-pointer"
					style={{
						width: "30px",
						height: "17px",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						pointerEvents: "none"
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
						className="absolute inset-0 transition cursor-pointer"
						style={{
							backgroundColor: "#ccc",
							borderRadius: "17px",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							transition: ".05s",
							pointerEvents: "none"
						}}
					/>
					<span
						className={
							`absolute rounded-full transition-transform flex items-center justify-center cursor-pointer \
              					${colorChangeOnToggle && checkedCondition ? "bg-blue-600" : "bg-white"}`
						}
						style={{
							height: "13px",
							width: "13px",
							left: "2px",
							bottom: "2px",
							transform: checkedCondition ? "translateX(13px)" : "translateX(0)",
							transition: ".05s",
							borderRadius: "50%",
							pointerEvents: "auto"
						}}
					>
						{checkedCondition && rightIcon}
						{!checkedCondition && leftIcon}
					</span>
				</label>
			</div>
		</>
	)
}
