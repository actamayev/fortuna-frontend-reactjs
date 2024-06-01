import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import Slider from "../slider"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultCurrency from "../../hooks/personal-info/set-default-currency"

function SolOrUsdSlider() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultCurrency = useSetDefaultCurrency()

	const defaultCurrency = useMemo(() => {
		if (_.isNull(personalInfoClass)) return "usd"
		return personalInfoClass.defaultCurrency
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.defaultCurrency])

	return (
		<div className="flex flex-col mr-2">
			<Slider
				checkedCondition={defaultCurrency === "sol"}
				onChangeCheckedCondition={setDefaultCurrency}
				whatToShow={defaultCurrency.toUpperCase()}
			/>
		</div>
	)
}

export default observer(SolOrUsdSlider)
