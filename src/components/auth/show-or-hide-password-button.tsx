import { useMemo } from "react"
import Button from "../button"

interface Props {
	showPassword: boolean,
	setShowPassword: (showPassword: boolean) => void,
}

export default function ShowOrHidePasswordButton (props: Props) {
	const { showPassword, setShowPassword } = props

	const hideOrShowPassword = useMemo(() => {
		if (showPassword) return "Hide Password"
		return "Show Password"
	}, [showPassword])

	return (
		<Button
			className = "font-semibold text-md text-zinc-50"
			colorClass = "bg-orange-600"
			hoverClass = "hover:bg-orange-700"
			onClick = {() => (setShowPassword(!showPassword))}
			title = {hideOrShowPassword}
		/>
	)
}
