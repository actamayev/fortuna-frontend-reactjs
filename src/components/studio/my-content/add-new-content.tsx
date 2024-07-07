import { useCallback } from "react"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

export default function AddNewContent() {
	const navigate = useTypedNavigate()

	const navigateToCreatorPageOnClick = useCallback(() => {
		navigate("/creator/create-content")
	}, [navigate])

	return (
		<div
			className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 m-2 grid \
				grid-cols-1 grid-rows-1 border border-zinc-200 dark:border-zinc-700 \
				hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
			style={{ width: "288px", height: "225px" }}
			onClick={navigateToCreatorPageOnClick}
		>
			<div className="flex justify-center items-center h-full">
				<span className="text-4xl text-gray-400">+</span>
			</div>
		</div>
	)
}
