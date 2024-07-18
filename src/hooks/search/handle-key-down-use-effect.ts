import { useEffect} from "react"

export default function useHandleKeyDownUseEffect(
	inputRef: React.RefObject<HTMLInputElement>
): void {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return (): void => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [inputRef])
}
