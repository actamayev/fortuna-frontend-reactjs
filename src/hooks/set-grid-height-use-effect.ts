import { useEffect } from "react"
import { GridApi } from "ag-grid-community"

export default function useSetGridHeight(
	setGridHeight: React.Dispatch<React.SetStateAction<string | number>>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	gridApi: GridApi<any> | null,
	rowDataLength: number
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
	}, [gridApi, rowDataLength, setGridHeight])
}
