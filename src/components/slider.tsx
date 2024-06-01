interface Props {
	checkedCondition: boolean | undefined
	onChangeCheckedCondition: React.ChangeEventHandler<HTMLInputElement> | undefined
	whatToShow?: string
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
}

export default function Slider(props: Props) {
	const { checkedCondition, onChangeCheckedCondition, whatToShow, disabledCondition, colorChangeOnToggle } = props

	return (
		<>
			<label
				className="relative inline-block"
				style={{ width: "30px", height: "17px" }}
			>
				<input
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
			{whatToShow && (
				<span className="text-sm font-medium text-zinc-900">
					{whatToShow}
				</span>
			)}
		</>
	)
}
