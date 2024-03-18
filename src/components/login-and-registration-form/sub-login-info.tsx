import { Link } from "react-router-dom"

export default function SubLoginInfo() {
	return (
		<>
			Need an account?{" "}
			<Link
				to="/register"
				className="hover:underline"
			>
				Register
			</Link>
		</>
	)
}

