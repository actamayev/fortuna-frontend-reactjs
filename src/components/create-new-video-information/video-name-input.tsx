import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useCreatorContext } from "../../contexts/creator-context"

function VideoNameInput() {
	const creatorClass = useCreatorContext()

	const splDetailsName = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.newVideoDetails.videoName
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.videoName])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewSplDetails("videoName", event.target.value)
	}, [creatorClass])

	return (
		<FormGroup
			label = "Token Name"
			type = "text"
			placeholder = "Charlie bit my finger"
			onChange = {updateNewSplDetails}
			required
			value = {splDetailsName}
		/>
	)
}

export default observer(VideoNameInput)
