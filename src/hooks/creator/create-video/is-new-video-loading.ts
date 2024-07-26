import { useMemo } from "react"
import { useCreatorContext } from "../../../contexts/creator-context"

export default function useIsNewVideoLoading(): boolean {
	const creatorClass = useCreatorContext()

	return useMemo(() => {
		return creatorClass.isNewVideoLoading
	}, [creatorClass.isNewVideoLoading])
}
