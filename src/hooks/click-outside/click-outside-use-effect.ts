import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useClickOutsideUseEffect(
	dropdownRef: React.RefObject<HTMLDivElement>,
	setIsOpen?: (newState: boolean) => void
): void {
	const location = useLocation()

	const handleClickOutside = useCallback((event: MouseEvent) => {
		const themeToggler = document.getElementById("theme-toggler")
		const solUsdSlider = document.getElementById("sol-usd-slider")
		if (
			dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
			(!themeToggler || !themeToggler.contains(event.target as Node)) &&
			(!solUsdSlider || !solUsdSlider.contains(event.target as Node)) &&
            !_.isUndefined(setIsOpen)
		) {
			setIsOpen(false)
		}
	}, [dropdownRef, setIsOpen])

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return (): void => document.removeEventListener("mousedown", handleClickOutside)
	}, [handleClickOutside])

	useEffect(() => {
		if (_.isUndefined(setIsOpen)) return
		setIsOpen(false)
	}, [location, setIsOpen])
}
