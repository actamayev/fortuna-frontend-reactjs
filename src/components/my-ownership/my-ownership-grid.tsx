import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useExchangeContext } from "../../contexts/exchange-context"
import useSetGridHeight from "../../hooks/set-grid-height-use-effect"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import myOwnershipColumns from "../../utils/grids/ownership-grid/my-ownership-columns"
import createOwnershipArrayForGrid from "../../utils/grids/ownership-grid/create-ownership-array-for-grid"

function MyOwnershipGrid() {
	const exchangeClass = useExchangeContext()
	const [rowData, setRowData] = useState<OwnershipGridRowData[]>([])
	const [gridHeight, setGridHeight] = useState<string | number>("100%")
	useSetGridHeight(rowData.length, setGridHeight)
	const navigateToVideo = useNavigateToVideo()

	useEffect(() => {
		if (_.isNull(exchangeClass)) return
		const eventTypesArray = createOwnershipArrayForGrid(exchangeClass.myOwnership)
		setRowData(eventTypesArray)
	}, [exchangeClass, exchangeClass?.myOwnership])

	if (_.isNull(exchangeClass)) return null

	if (exchangeClass.isRetrievingOwnership === true || exchangeClass.hasOwnershipToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Ownership...</div>
	} else if (_.isEmpty(exchangeClass.myOwnership)) {
		return <div className="dark:text-white">No ownership</div>
	}

	return (
		<div className="flex-1">
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

export default observer(MyOwnershipGrid)
