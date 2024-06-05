import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useCreatorContext } from "../../contexts/creator-context"

function VideoDescriptionInput() {
	const creatorClass = useCreatorContext()

	const splDetailsDescription = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.newVideoDetails.description
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.description])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewSplDetails("description", event.target.value)
	}, [creatorClass])

	return (
		<FormGroup
			label = "Video Description"
			type = "text"
			placeholder = "Charlie bit my finger really hard"
			onChange = {updateNewSplDetails}
			required
			value = {splDetailsDescription}
			multiline={true}
		/>
	)
}

export default observer(VideoDescriptionInput)
