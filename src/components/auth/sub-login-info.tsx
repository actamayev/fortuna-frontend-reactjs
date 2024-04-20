import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubLoginInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (!_.isUndefined(setLoginOrRegister)) {
		return (
			<>
				Need an account?{" "}
				<div
					className="hover:underline cursor-pointer font-bold"
					onClick={() => setLoginOrRegister("Register")}
				>
					Register
				</div>
			</>
		)
	}

	return (
		<>
			Need an account?{" "}
			<Link
				to="/register"
				className="hover:underline font-bold"
			>
				Register
			</Link>
		</>
	)
}

