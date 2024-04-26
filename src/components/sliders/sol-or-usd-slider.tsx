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
		<div className="flex flex-col items-center z-20">
			<label className="toggle-pill">
				<input
					type="checkbox"
					className="opacity-0 w-0 h-0"
					checked={personalInfoClass.getDefaultCurrency() === "sol"}
					onChange={setDefaultCurrency}
				/>
				<span className="slider absolute cursor-pointer inset-0 bg-gray-300 transition duration-50 rounded-full"></span>
				<span
					className="knob absolute left-1 bottom-1 h-6 w-6 bg-white rounded-full transition-transform duration-50"
					style={{ transform: personalInfoClass.getDefaultCurrency() === "sol" ? "translateX(13px)" : "translateX(0)" }}
				>
				</span>
			</label>
			<span className="text-sm font-medium text-black">
				{personalInfoClass.getDefaultCurrency().toUpperCase()}
			</span>
		</div>
	)
}

export default observer(SolOrUsdSlider)
