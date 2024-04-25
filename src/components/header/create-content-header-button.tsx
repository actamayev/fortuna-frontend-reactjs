import { Link, useLocation } from "react-router-dom"

export default function CreateContentHeaderButton() {
	const location = useLocation()
	const isActive = location.pathname.startsWith("/creator/upload-content")

	let classes
	if (isActive) classes = "bg-blue-200 border-blue-300"
	else classes = "bg-white border-blue-200 hover:bg-blue-300"

	return (
		<div className="inline-flex items-center justify-center flex-grow flex-shrink">
			<Link
				to="/creator/upload-content"
				className="font-bold text-center w-full"
			>
				<div
					className={`rounded text-black border px-4 transition-all duration-50 flex items-center justify-center ${classes}` }
					style={{ paddingTop: "2px", paddingBottom: "5px" }}
				>
					+
				</div>
			</Link>
		</div>
	)
}
