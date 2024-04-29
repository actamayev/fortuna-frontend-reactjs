import _ from "lodash"
import { observer } from "mobx-react"
import React, { useCallback } from "react"
import { useLocation } from "react-router-dom"
import useVideoSearch from "../../hooks/search/video-search"
import { useVideoContext } from "../../contexts/video-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"

// TODO: Make sure that when the position of hte search bar is always the same, regardless of wheather the user is logged in.
function SearchBar() {
	const navigate = useTypedNavigate()
	const videoClass = useVideoContext()
	const location = useLocation()
	const videoSearch = useVideoSearch()
	const handleTypeUsername = useHandleTypeUsername()

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
		<div className="flex justify-center items-center w-full flex-grow">
			<div className="p-4" style={{ width: "100%" }}>
				<input
					type="text"
					className="w-full pl-4 p-2 border border-gray-300 rounded-lg
						focus:outline-none focus:border-blue-500 dark:border-yellow-400 text-left"
					placeholder="Search..."
					value={videoClass.searchTerm || ""}
					onChange={e => videoClass.setSearchTerm(handleTypeUsername(e))}
					onKeyDown={handleSearch}
				/>
			</div>
		</div>
	)
}

export default observer(SearchBar)
