interface Props {
	title: string
	value: number
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	min: number
	max: number
	step: number
	disabled?: boolean
}

export default function RangeSelectorSlider(props: Props) {
	const { title, value, onChange, min, max, step, disabled } = props

	return (
		<>
			<label className = "block text-sm font-medium text-gray-600">{title}</label>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={onChange}
				className="w-5/6 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-800"
				disabled={disabled}
			/>
		</>
	)
}
