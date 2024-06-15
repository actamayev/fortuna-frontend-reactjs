import { useLocation } from "react-router-dom"
import SolOrUsdSlider from "../sliders/sol-or-usd-slider"

export default function SolOrUsdSliderInHeader() {
	const location = useLocation()

	if (location.pathname !== "/my-wallet") return null

	return (
		<div className="flex flex-col">
			<SolOrUsdSlider />
		</div>
	)
}
