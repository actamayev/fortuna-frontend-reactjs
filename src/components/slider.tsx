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
			<label className="toggle-pill">
				<input
					type="checkbox"
					checked={checkedCondition}
					onChange={onChangeCheckedCondition}
					disabled={disabledCondition}
				/>
				<span className="slider absolute cursor-pointer inset-0 transition">
				</span>
				<span
					className={
						`knob absolute left-1 bottom-1 rounded-full transition-transform \
							${colorChangeOnToggle && checkedCondition ? "bg-blue-600" : "bg-white"}`
					}
					style={{ transform: checkedCondition ? "translateX(13px)" : "translateX(0)" }}
				>
				</span>
			</label>
			{whatToShow && (
				<span className="text-sm font-medium text-black">
					{whatToShow}
				</span>
			)}
		</>
	)
}
