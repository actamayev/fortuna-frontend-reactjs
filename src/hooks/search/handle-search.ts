import _ from "lodash"
import { useCallback} from "react"
import useGeneralSearch from "./general-search"
import useTypedNavigate from "../navigate/typed-navigate"
import { useVideoContext } from "../../contexts/video-context"

export default function useHandleSearch(): (
	event: React.KeyboardEvent<HTMLInputElement>
) => Promise<void> {
	const videoClass = useVideoContext()
	const generalSearch = useGeneralSearch()
	const navigate = useTypedNavigate()

	return useCallback(async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (
			event.key !== "Enter" ||
			_.isNull(videoClass.searchTerm) ||
			_.isEmpty(videoClass.searchTerm.trim())
		) return
		await generalSearch()
		if (location.pathname !== (`/s/${videoClass.searchTerm}`)) {
			navigate(`/s/${videoClass.searchTerm}`)
		}
	}, [navigate, videoClass.searchTerm, generalSearch])
}
