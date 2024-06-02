import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import ProfileDropdownItems from "./profile-dropdown-items"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	isOpen: boolean
}

function DropdownItemsContainer (props: Props) {
	const { isOpen } = props
	const personalInfoClass = usePersonalInfoContext()

	const classes = useMemo(() => {
		if (_.isNull(personalInfoClass) || personalInfoClass.defaultSiteTheme === "light") {
			return "origin-top-right absolute right-0 mt-1 rounded-md bg-white ring-1 ring-zinc-900 ring-opacity-20"
		}
		return "origin-top-right absolute right-0 mt-1 rounded-md bg-zinc-900 ring-1 ring-white ring-opacity-20"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.defaultSiteTheme])

	if (isOpen === false) return null

	return (
		<div
			className={classes}
			style={{ width: "170px"}}
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<ProfileDropdownItems />
		</div>
	)
}

export default observer(DropdownItemsContainer)
