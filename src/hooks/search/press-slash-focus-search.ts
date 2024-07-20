import { useEffect} from "react"

export default function usePressSlashFocusSearch(
	inputRef: React.RefObject<HTMLInputElement>
): void {
	useEffect(() => {
		const pressSlashFocusSearch = (event: KeyboardEvent): void => {
			if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}

		document.addEventListener("keydown", pressSlashFocusSearch)
		return (): void => {
			document.removeEventListener("keydown", pressSlashFocusSearch)
		}
	}, [inputRef])
}
