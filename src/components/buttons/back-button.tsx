import { IoCaretBackOutline } from "react-icons/io5"
import Button from "./button"

interface Props {
	onClick: () => void
}
export default function BackButton(props: Props) {
	const { onClick } = props

	return (
		<Button
			titleIcon={<IoCaretBackOutline />}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-500"
			onClick={onClick}
			className="font-semibold text-zinc-950"
		/>
	)
}
