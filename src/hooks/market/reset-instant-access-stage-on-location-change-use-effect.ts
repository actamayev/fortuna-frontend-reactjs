import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useMarketContext } from "../../contexts/market-context"

export default function useResetInstantAccessStageOnLocationChangeUseEffect(): void {
	const marketClass = useMarketContext()
	const location = useLocation()

	useEffect(() => {
		marketClass.resetInstantAccessToExclusiveContentStage()
	}, [location, marketClass])
}
