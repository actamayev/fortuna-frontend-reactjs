import { Routes, Route } from "react-router-dom"
import Missing from "../pages/missing"
import MyContent from "../pages/creator/my-content"
import CreateContent from "../pages/creator/create-content"

export default function CreatorRoutes() {
	return (
		<Routes>
			<Route path="my-content" element={<MyContent />} />
			<Route path="create-content" element={<CreateContent />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
