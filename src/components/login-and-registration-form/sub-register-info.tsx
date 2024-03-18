import { Link } from "react-router-dom"

export default function SubRegisterInfo() {
	return (
		<>
			Already have an account?{" "}
			<Link
				to="/login"
				className="hover:underline"
			>
				Login
			</Link>
		</>
	)
}

