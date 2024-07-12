import { useCallback } from "react"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useAssignDefaultChannelName(): (
	setChannelName: (value: React.SetStateAction<string>) => void
) => void {
	const creatorClass = useCreatorContext()
	const personalInfoClass = usePersonalInfoContext()

	return useCallback((
		setChannelName: (value: React.SetStateAction<string>) => void
	): void => {
		try {
			if (creatorClass?.channelName) {
				setChannelName(creatorClass.channelName)
			} else if (personalInfoClass?.username) {
				setChannelName(personalInfoClass.username)
			}
		} catch (error) {
			console.error(error)
		}
	}, [creatorClass?.channelName, personalInfoClass?.username])
}
