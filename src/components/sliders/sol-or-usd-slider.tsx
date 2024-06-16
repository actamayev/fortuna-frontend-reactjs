import { observer } from "mobx-react"
import { SiSolana } from "react-icons/si"
import { IoLogoUsd } from "react-icons/io"
import Slider from "../sliders/slider"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultCurrency from "../../hooks/personal-info/set-default-currency"

function SolOrUsdSlider() {
	const personalInfoClass = usePersonalInfoContext()
	const defaultCurrency = useDefaultCurrency()
	const setDefaultCurrency = useSetDefaultCurrency()

	return (
		<Slider
			id="sol-usd-slider"
			checkedCondition={defaultCurrency === "sol"}
			onChangeCheckedCondition={setDefaultCurrency}
			leftIcon={
				<IoLogoUsd
					size={10}
					color={personalInfoClass?.defaultSiteTheme === "dark" ? "white" : ""}
				/>
			}
			rightIcon={
				<SiSolana
					size={10}
					color={personalInfoClass?.defaultSiteTheme === "dark" ? "white" : ""}
				/>
			}
		/>
	)
}

export default observer(SolOrUsdSlider)
