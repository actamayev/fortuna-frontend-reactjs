export default function LoadingVideoPlayer() {
	return (
		<div className="relative">
			<div className="grid grid-cols-12">
				<div className="col-span-9">
					<div className="w-full">
						<div className="w-full h-full" style={{ aspectRatio: "16/9" }}>
							<div className="relative w-full h-full rounded-xl overflow-hidden">
								<div className="absolute inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50 backdrop-blur">
									<div className="w-16 h-16 border-4 border-dotted border-white rounded-full animate-spin"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
