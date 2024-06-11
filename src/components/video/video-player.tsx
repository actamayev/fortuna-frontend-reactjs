interface Props {
	videoUrl: string | undefined
}

// FUTURE TODO: Make the aspect ratio of the video player the same as the home screen thumnail picture.
export default function VideoPlayer(props: Props) {
	const { videoUrl } = props

	return (
		<div className="w-full">
			{videoUrl ? (
				<video
					controls
					autoPlay
					className="w-full h-full rounded-lg"
					controlsList="nodownload"
				>
					<source src={videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			) : (
				<div className="w-full h-full rounded-lg bg-zinc-100 dark:bg-zinc-800" style={{ aspectRatio: "16/9" }}>
					{/* Placeholder content if needed */}
				</div>
			)}
		</div>
	)
}
