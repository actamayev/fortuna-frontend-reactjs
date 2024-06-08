import useTypedNavigate from "../../hooks/navigate/typed-navigate"

export default function AddNewContent() {
	const navigate = useTypedNavigate()

	return (
		<div
			className="bg-white dark:bg-zinc-800 rounded-lg p-4 m-2 grid \
				grid-cols-1 grid-rows-1 border hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
			onClick={() => navigate("/creator/create-content")}
		>
			<div className="flex justify-center items-center h-full">
				<span className="text-4xl text-gray-400">+</span>
			</div>
		</div>
	)
}
