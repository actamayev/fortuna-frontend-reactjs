import { ColDef } from "ag-grid-community"
import { caseInsensitiveComparator } from "../comparators"
import ThumbnailImageViewer from "../../../components/my-ownership/thumbnail-image-viewer"

const myOwnershipColumns: ColDef[] = [
	{ headerName: "Thumbnail", field: "thumbnailUrl", cellRenderer: ThumbnailImageViewer, width: 120 },
	{ headerName: "Token Name", field: "splName", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Number of Shares", field: "numberShares", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "videoUUID", field: "videoUUID", hide: true}
]

export default myOwnershipColumns
