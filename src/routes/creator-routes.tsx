import { Routes, Route } from "react-router-dom"
import Missing from "../pages/missing"
import Studio from "../pages/creator/studio"
import CreateContent from "../pages/creator/create-content"

export default function CreatorRoutes() {
	return (
		<Routes>
			<Route path="studio" element={<Studio />} />
			<Route path="create-content" element={<CreateContent />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
