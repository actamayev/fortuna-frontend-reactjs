interface Props {
	checkedCondition: boolean | undefined
	onChangeCheckedCondition: React.ChangeEventHandler<HTMLInputElement> | undefined
	whatToShow?: string
	disabledCondition?: boolean
}

export default function Slider(props: Props) {
	const { checkedCondition, onChangeCheckedCondition, whatToShow, disabledCondition } = props

	return (
		<>
			<label className="toggle-pill">
				<input
					type="checkbox"
					className="opacity-0 w-0 h-0"
					checked={checkedCondition}
					onChange={onChangeCheckedCondition}
					disabled={disabledCondition}
				/>
				<span className="slider absolute cursor-pointer inset-0 bg-gray-300 transition duration-50 rounded-full"></span>
				<span
					className="knob absolute left-1 bottom-1 h-6 w-6 bg-white rounded-full transition-transform duration-50"
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
