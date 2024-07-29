import { useCallback } from "react"
import useNavigateToHashtagPage from "../../../hooks/navigate/navigate-to-hashtag-page"

interface Props {
	hashtag: string
}

export default function SingleHashtag(props: Props) {
	const { hashtag } = props
	const navigateToHashtagPage = useNavigateToHashtagPage()

	const navigateToHashtagPageCallback = useCallback(() => {
		navigateToHashtagPage(hashtag)
	}, [hashtag, navigateToHashtagPage])

	return (
		<div
			className="cursor-pointer mr-2 p-1 rounded-md bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
			onClick={navigateToHashtagPageCallback}
		>
			#{hashtag}
		</div>
	)
}
