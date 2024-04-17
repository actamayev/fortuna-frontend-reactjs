import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubRegisterInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (!_.isUndefined(setLoginOrRegister)) {
		return (
			<>
				Already have an account?{" "}
				<div
					className="hover:underline cursor-pointer font-bold"
					onClick={() => setLoginOrRegister("Login")}
				>
					Login
				</div>
			</>
		)
	}
	return (
		<>
			Already have an account?{" "}
			<Link
				to="/login"
				className="hover:underline font-bold"
			>
				Login
			</Link>
		</>
	)
}

