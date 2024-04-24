import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useClickOutSideUseEffect(
	dropdownRef: React.RefObject<HTMLDivElement>,
	setIsOpen?: (newState: boolean) => void
): void {
	const location = useLocation()

	const handleClickOutside = useCallback((event: MouseEvent) => {
		// Check if the clicked element is part of the dark mode slider
		const sliderHTML = (event.target as HTMLElement).closest(".toggle-pill")

		if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !_.isUndefined(setIsOpen) &&
            !sliderHTML
		) {
			setIsOpen(false)
		}
	}, [dropdownRef, setIsOpen])

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [handleClickOutside])

	useEffect(() => {
		if (_.isUndefined(setIsOpen)) return
		setIsOpen(false)
	}, [location, setIsOpen])
}
