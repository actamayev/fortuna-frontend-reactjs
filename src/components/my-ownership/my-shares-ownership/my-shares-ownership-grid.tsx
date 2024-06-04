import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import useSetGridHeight from "../../../hooks/set-grid-height-use-effect"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"
import myOwnershipColumns from "../../../utils/grids/my-ownership/my-ownership-columns"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"
import createOwnershipArrayForGrid from "../../../utils/grids/my-ownership/create-ownership-array-for-grid"

function MySharesOwnershipGrid() {
	const [rowData, setRowData] = useState<OwnershipGridRowData[]>([])
	const [gridHeight, setGridHeight] = useState<string | number>("100%")
	const defaultSiteTheme = useDefaultSiteTheme()
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()
	useSetGridHeight(rowData.length, setGridHeight)
	const navigateToVideoPage = useNavigateToVideoPage()

	useEffect(() => {
		if (_.isNull(positionsAndTransactionClass)) return
		const eventTypesArray = createOwnershipArrayForGrid(positionsAndTransactionClass.myOwnership)
		setRowData(eventTypesArray)
	}, [positionsAndTransactionClass, positionsAndTransactionClass?.myOwnership])

	if (_.isNull(positionsAndTransactionClass)) return null

	if (positionsAndTransactionClass.isRetrievingOwnership === true || positionsAndTransactionClass.hasOwnershipToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Ownership...</div>
	} else if (_.isEmpty(positionsAndTransactionClass.myOwnership)) {
		return <div className="dark:text-white">No Ownership</div>
	}

	return (
		<div className="flex-1">
			<div className="dark:text-white">
				Shares
			</div>
			<div
				className={defaultSiteTheme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark"}
				style={{ height: gridHeight, width: "100%" }}
			>
				<AgGridReact
					columnDefs={myOwnershipColumns}
					rowData={rowData}
					pagination={true}
					headerHeight={40}
					paginationPageSize={50}
					rowHeight={40}
					onRowDoubleClicked={(ownership) => navigateToVideoPage(ownership.data.videoUUID)}
				/>
			</div>
		</div>
	)
}

export default observer(MySharesOwnershipGrid)
