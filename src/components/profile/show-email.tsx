// import _ from "lodash"
// import { useMemo } from "react"
// import { observer } from "mobx-react"
// import { usePersonalInfoContext } from "../../contexts/personal-info-context"

// function ShowEmail() {
// 	const personalInfoClass = usePersonalInfoContext()

// 	const email = useMemo(() => {
// 		return personalInfoClass.email
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [personalInfoClass, personalInfoClass?.email])

// 	return (
// 		<div>
// 			<label className="block text-sm font-bold text-zinc-800 dark:text-zinc-50">
// 				Email
// 			</label>
// 			<div className="text-zinc-950 dark:text-zinc-50 text-base">
// 				{email}
// 			</div>
// 		</div>
// 	)
// }

// export default observer(ShowEmail)
