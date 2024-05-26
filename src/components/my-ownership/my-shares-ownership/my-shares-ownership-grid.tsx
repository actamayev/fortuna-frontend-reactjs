import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import useSetGridHeight from "../../../hooks/set-grid-height-use-effect"
import useNavigateToVideo from "../../../hooks/navigate/navigate-to-video"
import myOwnershipColumns from "../../../utils/grids/my-ownership/my-ownership-columns"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"
import createOwnershipArrayForGrid from "../../../utils/grids/my-ownership/create-ownership-array-for-grid"

function MySharesOwnershipGrid() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()
	const [rowData, setRowData] = useState<OwnershipGridRowData[]>([])
	const [gridHeight, setGridHeight] = useState<string | number>("100%")
	useSetGridHeight(rowData.length, setGridHeight)
	const navigateToVideo = useNavigateToVideo()

	useEffect(() => {
		if (_.isNull(positionsAndTransactionClass)) return
		const eventTypesArray = createOwnershipArrayForGrid(positionsAndTransactionClass.myOwnership)
		setRowData(eventTypesArray)
	}, [positionsAndTransactionClass, positionsAndTransactionClass?.myOwnership])

	if (_.isNull(positionsAndTransactionClass)) return null

	if (positionsAndTransactionClass.isRetrievingOwnership === true || positionsAndTransactionClass.hasOwnershipToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Ownership...</div>
	} else if (_.isEmpty(positionsAndTransactionClass.myOwnership)) {
		return <div className="dark:text-white">No ownership</div>
	}

	return (
		<div className="flex-1">
			<div className="dark:text-white">
				Shares
			</div>
			<div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
				<AgGridReact
					columnDefs={myOwnershipColumns}
					rowData={rowData}
					pagination={true}
					headerHeight={40}
					paginationPageSize={50}
					rowHeight={40}
					onRowDoubleClicked={(ownership) => navigateToVideo(ownership.data.videoUUID)}
				/>
			</div>
		</div>
	)
}

export default observer(MySharesOwnershipGrid)
