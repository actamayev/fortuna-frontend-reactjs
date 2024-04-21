import _ from "lodash"
import { observer } from "mobx-react"
import "../../styles/toggle-styles.css"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultCurrency from "../../hooks/personal-info/set-default-currency"

function SolOrUsdSlider() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultCurrency = useSetDefaultCurrency()

	if (_.isNull(personalInfoClass)) return null

	return (
		<div className="flex flex-col items-center space-y-2 z-20 mr-36">
			<label className="toggle-pill">
				<input
					type="checkbox"
					className="opacity-0 w-0 h-0"
					checked={personalInfoClass.defaultCurrency === "sol"}
					onChange={setDefaultCurrency}
				/>
				<span className="slider absolute cursor-pointer inset-0 bg-gray-300 transition duration-300 rounded-full"></span>
				<span className="knob absolute left-1 bottom-1 h-6 w-6 bg-white rounded-full transition-transform duration-300"
					style={{ transform: personalInfoClass.defaultCurrency === "sol" ? "translateX(13px)" : "translateX(0)" }}>
				</span>
			</label>
			<span className="text-sm font-medium text-white">
				{personalInfoClass.defaultCurrency.toUpperCase()}
			</span>
		</div>
	)
}

export default observer(SolOrUsdSlider)
