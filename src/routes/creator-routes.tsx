import { Routes, Route } from "react-router-dom"
import Missing from "../pages/missing"
import MyContent from "../pages/creator/my-content"
import CreatorWallet from "../pages/creator/creator-wallet"
import UploadContent from "../pages/creator/upload-content"

export default function CreatorRoutes() {
	return (
		<Routes>
			<Route path="my-content" element={<MyContent />} />
			<Route path="my-wallet" element={<CreatorWallet />} />
			<Route path="upload-content" element={<UploadContent />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
