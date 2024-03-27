import { Routes, Route } from "react-router-dom"
import Missing from "../pages/missing"
import MyWallet from "../pages/creator/my-wallet"
import MyContent from "../pages/creator/my-content"

export default function CreatorRoutes() {
	return (
		<Routes>
			<Route path="my-content" element={<MyContent />} />
			<Route path="my-wallet" element={<MyWallet />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
