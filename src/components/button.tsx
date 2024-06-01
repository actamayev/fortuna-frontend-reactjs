/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	title: string
	colorClass: string
	hoverClass: string
	disabled?: boolean
	onClick?: (e: any) => void | Promise<void>
	className?: string
}

export default function Button (props: Props) {
	let backgroundColor
	let hoverColor
	if (props.disabled) {
		backgroundColor = "bg-gray-400"
		hoverColor = ""
	} else {
		backgroundColor = props.colorClass || "bg-black"
		hoverColor = props.hoverClass || ""
	}

	const css = `rounded p-2 ${backgroundColor} ${hoverColor} ${props.className}`

	return (
		<button
			type = {props.onClick ? "button" : "submit"}
			className = {css}
			onClick = {props.onClick}
			disabled = {props.disabled ?? false}
		>
			{props.title}
		</button>
	)
}
