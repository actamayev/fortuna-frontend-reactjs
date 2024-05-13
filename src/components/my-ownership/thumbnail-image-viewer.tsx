// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ThumbnailImageViewer(params: any) {
	return (
		<img
			src={params.data.imageUrl}
			width={50}
		/>
	)
}
