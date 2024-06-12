import { useCallback } from "react"

interface Props {
	name: string
	email: string
	setNotification: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ContactItemInCard(props: Props) {
	const { name, email, setNotification } = props

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(email)
			setNotification(`${email} copied to clipboard`)
		} catch (error) {
			console.error(error)
		}
	}, [email, setNotification])

	return (
		<div
			className="flex justify-between py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 m-1 rounded-lg cursor-pointer"
			onClick={copyToClipboard}
		>
			<span className="text-left ml-2">{name}</span>
			<span className="text-right font-semibold mr-2">
				{email}
			</span>
		</div>
	)
}
