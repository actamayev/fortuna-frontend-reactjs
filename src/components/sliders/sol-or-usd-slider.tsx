import { observer } from "mobx-react"
import { SiSolana } from "react-icons/si"
import { IoLogoUsd } from "react-icons/io"
import Slider from "../sliders/slider"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import useSetDefaultCurrency from "../../hooks/personal-info/set-default-currency"

function SolOrUsdSlider() {
	const defaultCurrency = useDefaultCurrency()
	const setDefaultCurrency = useSetDefaultCurrency()

	return (
		<div className="text-black dark:text-white">
			<Slider
				id="sol-usd-slider"
				checkedCondition={defaultCurrency === "sol"}
				onChangeCheckedCondition={setDefaultCurrency}
				leftIcon={<IoLogoUsd size={10} />}
				rightIcon={<SiSolana size={10}/>}
			/>
		</div>
	)
}

export default observer(SolOrUsdSlider)
