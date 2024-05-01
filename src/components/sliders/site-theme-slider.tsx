import _ from "lodash"
import { observer } from "mobx-react"
import "../../styles/toggle-styles.css"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultSiteTheme from "../../hooks/personal-info/set-default-site-theme"

// TODO: Change this from a slider to a button that is eihter the sun or the moon (sun is light, moon is dark mode)
function SiteThemeSlider() {
	const personalInfoClass = usePersonalInfoContext()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	if (_.isNull(personalInfoClass)) return null

	return (
		<div className="flex flex-col items-center z-20">
			<label className="toggle-pill">
				<input
					type="checkbox"
					className="opacity-0 w-0 h-0"
					checked={personalInfoClass.defaultSiteTheme === "light"}
					onChange={setDefaultSiteTheme}
				/>
				<span className="slider absolute cursor-pointer inset-0 bg-gray-300 transition duration-50 rounded-full"></span>
				<span
					className="knob absolute left-1 bottom-1 h-6 w-6 bg-white rounded-full transition-transform duration-50"
					style={{ transform: personalInfoClass.defaultSiteTheme === "light" ? "translateX(13px)" : "translateX(0)" }}
				>
				</span>
			</label>
			<span className="text-sm font-medium text-black">
				{personalInfoClass.defaultSiteTheme.toUpperCase()}
			</span>
		</div>
	)
}

export default observer(SiteThemeSlider)
