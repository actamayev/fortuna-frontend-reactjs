import _ from "lodash"
import { observer } from "mobx-react"
import React, { useCallback } from "react"
import { useLocation } from "react-router-dom"
import useVideoSearch from "../../hooks/search/video-search"
import { useVideoContext } from "../../contexts/video-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

function SearchBar() {
	const navigate = useTypedNavigate()
	const videoClass = useVideoContext()
	const location = useLocation()
	const videoSearch = useVideoSearch()

	const handleSearch = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key !== "Enter" ||
			_.isNull(videoClass.searchTerm) ||
			_.isEmpty(videoClass.searchTerm.trim())
		) return
		videoSearch()
		if (location.pathname !== (`/s/${videoClass.searchTerm}`) ) {
			navigate(`/s/${videoClass.searchTerm}`)

		}
	}, [location.pathname, navigate, videoClass.searchTerm, videoSearch])

	return (
		<div className="flex justify-center items-center w-full">
			<div className="p-4" style={{ width: "37.5%"}}>
				<input
					type="text"
					className="w-full p-2 border border-gray-300 rounded-lg
						focus:outline-none focus:border-blue-500 dark:border-yellow-400 text-center"
					placeholder="Search..."
					value={videoClass.searchTerm || ""}
					onChange={e => videoClass.setSearchTerm(e.target.value)}
					onKeyDown={handleSearch}
				/>
			</div>
		</div>
	)
}

export default observer(SearchBar)
