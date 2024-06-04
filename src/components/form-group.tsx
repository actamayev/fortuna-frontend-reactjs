interface Props {
	as?: React.ElementType
	className?: string
	label?: string
	maxValue?: number
	minDate?: string
	minValue?: number
	maxLength?: number
	multiline?: boolean
	name?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	required?: boolean
	rows?: number
	type?: string
	step?: number
	value?: string
	children?: React.ReactNode
}

export default function FormGroup(props: Props) {
	const {
		as,
		className,
		label,
		maxValue,
		minDate,
		minValue,
		maxLength,
		multiline,
		name,
		onChange,
		pattern,
		placeholder,
		required,
		rows,
		type,
		step,
		value,
		children,
	} = props
	const Component = as || (multiline ? "textarea" : "input")

	const minAttribute = type === "datetime-local" ? minDate : minValue

	return (
		<div className= {`mb-4 ${className}`}>
			{label && <label className = "block text-sm font-medium text-zinc-600 dark:text-white">{label}</label>}
			<Component
				className ="mt-1 p-2 w-full border rounded-md text-black dark:text-white bg-white dark:bg-zinc-800"
				max={maxValue}
				min = {minAttribute}
				maxLength = {maxLength}
				name = {name}
				onChange = {onChange}
				pattern = {pattern}
				placeholder = {placeholder}
				required = {required}
				rows={multiline ? rows : undefined} // Apply rows only for textarea
				type={!multiline ? type || "text" : undefined} // Don't apply type to textarea
				step={!multiline ? step : undefined} // Don't apply step to textarea
				value = {value}
			>
				{children}
			</Component>
		</div>
	)
}
