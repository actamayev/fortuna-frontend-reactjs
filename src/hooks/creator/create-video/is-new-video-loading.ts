import _ from "lodash"
import { useMemo } from "react"
import { useCreatorContext } from "../../../contexts/creator-context"

export default function useIsNewVideoLoading(): boolean {
	const creatorClass = useCreatorContext()

	return useMemo(() => {
		if (_.isNull(creatorClass)) return true
		return creatorClass.isNewVideoLoading
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.isNewVideoLoading])
}
