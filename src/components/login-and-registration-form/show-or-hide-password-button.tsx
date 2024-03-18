import Button from "../button"

interface Props {
	showPassword: boolean,
	setShowPassword: (showPassword: boolean) => void,
}

export default function ShowOrHidePasswordButton (props: Props) {
	const { showPassword, setShowPassword } = props

	const hideOrShowPassword = () => {
		if (showPassword) return "Hide Password"
		return "Show Password"
	}

	return (
		<Button
			className = "font-bold text-md text-white"
			colorClass = "bg-orange-600"
			hoverClass = "hover:bg-orange-700"
			onClick = {() => (setShowPassword(!showPassword))}
			title = {hideOrShowPassword()}
		/>
	)
}
