import { Link } from "react-router-dom"

export default function NullUserNavLink() {
	return (
		<div className="flex flex-col items-stretch w-full ml-2">
			<div className="flex justify-start mr-1">
				<Link
					to="/register"
					className="text-white hover:text-gray-200 rounded-md font-bold text-xl"
				>
                    Register
				</Link>
			</div>
			<div className="flex justify-end mr-1">
				<Link
					to="/login"
					className="text-white hover:text-gray-200 rounded-md font-bold text-lg"
				>
                    Login
				</Link>
			</div>
		</div>
	)
}
