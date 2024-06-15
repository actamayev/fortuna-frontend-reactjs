interface Props {
	isActive: boolean
	tier: TierDataFromDB
	progress: number
	isSoldOut?: boolean
}

export default function TierProgressBar(props: Props) {
	const { isActive, tier, progress, isSoldOut } = props

	return (
		<div className="flex items-center space-x-2 relative">
			<div
				className="absolute -top-2.5 left-0 text-black dark:text-white font-bold rounded-full \
					w-6 h-6 border border-black dark:border-white flex items-center justify-center text-md bg-zinc-200 dark:bg-zinc-700"
				style={{
					backgroundColor: isActive ? "rgb(250, 255, 0)" : "",
					color: isActive ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"
				}}
			>
				{tier.tierNumber}
			</div>
			<div className="flex items-center w-full h-8 bg-zinc-200 dark:bg-zinc-700 \
				rounded-full border border-black dark:border-zinc-300 overflow-hidden"
			>
				<div className="bg-zinc-200 dark:bg-zinc-700 h-full flex items-center justify-center ml-4 mr-2">
					<span className="text-black dark:text-white font-black">
						${tier.tierAccessPriceUsd}
					</span>
				</div>
				<div
					className="bg-red-600 h-full flex items-center pr-2 rounded-full border-r-0 \
    					border border-black dark:border-zinc-300"
					style={{ width: `${progress}%` }}
				>
					{isSoldOut && (
						<div className="flex-1 flex justify-center">
							<span className="text-white font-medium">SOLD OUT</span>
						</div>
					)}
					<span className="text-white font-medium ml-auto">{progress}%</span>
				</div>

			</div>
		</div>
	)
}
