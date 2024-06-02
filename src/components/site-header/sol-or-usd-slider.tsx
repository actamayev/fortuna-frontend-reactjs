import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { SiSolana } from "react-icons/si"
import { IoLogoUsd } from "react-icons/io"
import { useLocation } from "react-router-dom"
import Slider from "../slider"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultCurrency from "../../hooks/personal-info/set-default-currency"

function SolOrUsdSlider() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultCurrency = useSetDefaultCurrency()
	const location = useLocation()

	const defaultCurrency = useMemo(() => {
		if (_.isNull(personalInfoClass)) return "usd"
		return personalInfoClass.defaultCurrency
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.defaultCurrency])

	if (location.pathname === "/register" || location.pathname === "/login") return null

	return (
		<div className="flex flex-col">
			<Slider
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
		</div>
	)
}

export default observer(SolOrUsdSlider)
