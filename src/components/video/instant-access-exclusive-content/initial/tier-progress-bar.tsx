export default function TierProgressBar() {
	const progress = 40

	return (
		<div className="flex items-center space-x-2 relative">
			<div
				className="absolute -top-2.5 left-0 text-black font-bold rounded-full w-6 h-6 border \
					border-black flex items-center justify-center text-md"
				style={{ backgroundColor: "rgb(250, 255, 0)" }}
			>
				1
			</div>
			{/* <div className="text-black font-bold ml-10">
				$5
			</div> */}
			<div className="flex items-center w-full h-8 bg-gray-200 rounded-full border border-black overflow-hidden">
				<div
					className="bg-red-500 h-full flex items-center justify-end pr-2 rounded-full"
					style={{ width: `${progress}%` }}
				>
					<span className="text-white font-bold">{progress}%</span>
				</div>
			</div>
		</div>
	)
}
