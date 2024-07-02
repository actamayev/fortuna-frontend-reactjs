import { observer } from "mobx-react"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface Props {
	isActive: boolean
	tier: TierDataFromDB
}

function TierNumberSnowball(props: Props) {
	const { isActive, tier } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div
			className="absolute -top-2.5 left-0 font-bold rounded-full \
				w-6 h-6 border border-black dark:border-white flex items-center justify-center text-md bg-zinc-200 dark:bg-zinc-700"
			style={{
				backgroundColor: isActive ? "rgb(250, 255, 0)" : "",
				color: (defaultSiteTheme === "dark" && isActive === false) ? "white" : "black"
			}}
		>
			{tier.tierNumber}
		</div>
	)
}

export default observer(TierNumberSnowball)
