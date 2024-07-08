import _ from "lodash"
import { useCallback } from "react"

export default function useHandleClickExternalSocialLink(): (socialLink: string) => void {
	const handleClickExternalSocialLink = useCallback((socialLink: string) => {
		if (_.isEmpty(socialLink)) return
		const url = socialLink.startsWith("http")
			? socialLink
			: `http://${socialLink}`
		window.open(url, "_blank")
	}, [])

	return handleClickExternalSocialLink
}
