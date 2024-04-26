import { useParams } from "react-router-dom"

export default function Creator() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()

	return (
		<div className="text-black dark:text-white">
			{creatorUsername || ""}
		</div>
	)
}
