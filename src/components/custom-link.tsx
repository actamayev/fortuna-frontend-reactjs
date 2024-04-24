import { Link } from "react-router-dom"

export default function NullUserNavLink() {
	return (
		<div className="flex flex-col items-stretch w-full">
			<div className="flex justify-start mr-3">
				<Link
					to="/register"
					className="text-gray-200 hover:text-white rounded-md font-bold text-2xl"
				>
                    Register
				</Link>
			</div>
			<div className="flex justify-end mr-3">
				<Link
					to="/login"
					className="text-gray-200 hover:text-white rounded-md font-bold text-xl"
				>
                    Login
				</Link>
			</div>
		</div>
	)
}
