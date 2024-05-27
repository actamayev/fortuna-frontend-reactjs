import { ColDef } from "ag-grid-community"
import { caseInsensitiveComparator, numberComparator } from "../comparators"
import ThumbnailImageViewer from "../../../components/my-ownership/my-shares-ownership/thumbnail-image-viewer"

const myOwnershipColumns: ColDef[] = [
	{ headerName: "Thumbnail", field: "thumbnailUrl", cellRenderer: ThumbnailImageViewer, width: 120 },
	{ headerName: "Token Name", field: "splName", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Number of Shares", field: "numberShares", comparator: numberComparator, width: 175 },
	{ headerName: "Avg. Purchase Price/Share ($)", field: "averagePricePerShareUsd", comparator: numberComparator, width: 230 },
	{ headerName: "videoUUID", field: "videoUUID", hide: true}
]

export default myOwnershipColumns
