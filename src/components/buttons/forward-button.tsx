import { IoCaretForward } from "react-icons/io5"
import Button from "./button"

interface Props {
	onClick: () => void
	disabled?: boolean
}

export default function ForwardButton(props: Props) {
	const { onClick, disabled } = props

	return (
		<Button
			titleIcon={<IoCaretForward />}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-500"
			onClick={onClick}
			className="font-semibold text-zinc-950"
			disabled={disabled}
		/>
	)
}
