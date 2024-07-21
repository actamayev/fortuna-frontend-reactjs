import { useCallback, useEffect} from "react"

export default function usePressSlashFocusSearch(
	inputRef: React.RefObject<HTMLInputElement>
): void {
	const pressSlashFocusSearch = useCallback((event: KeyboardEvent): void => {
		if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
			event.preventDefault()
			inputRef.current?.focus()
		}
	}, [inputRef])

	useEffect(() => {
		document.addEventListener("keydown", pressSlashFocusSearch)
		return (): void => {
			document.removeEventListener("keydown", pressSlashFocusSearch)
		}
	}, [pressSlashFocusSearch])
}
