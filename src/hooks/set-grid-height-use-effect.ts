import { useEffect } from "react"

export default function useSetGridHeight(
	rowDataLength: number,
	setGridHeight: React.Dispatch<React.SetStateAction<string | number>>
): void {
	useEffect(() => {
		const rowHeight = 40 // Your row height
		const headerHeight = 40
		const paginationPanelHeight = 70 // Approximate pagination panel height
		const totalRowsHeight = rowDataLength * rowHeight
		const totalGridHeight = headerHeight + totalRowsHeight + paginationPanelHeight

		// Set maximum height if total height is greater than a certain value
		const maxHeight = 1500
		setGridHeight(Math.min(totalGridHeight, maxHeight))
	}, [rowDataLength, setGridHeight])
}
