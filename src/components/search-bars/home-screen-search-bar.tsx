import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useVideoContext } from "../../contexts/video-context"
import useHandleSearch from "../../hooks/search/handle-search"
import usePressSlashFocusSearch from "../../hooks/search/press-slash-focus-search"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"

function HomeScreenSearchBar() {
	const location = useLocation()
	const videoClass = useVideoContext()
	const handleTypeUsername = useHandleTypeUsername()
	const inputRef = useRef<HTMLInputElement>(null)
	const handleSearch = useHandleSearch()
	usePressSlashFocusSearch(inputRef)

	useEffect(() => {
		inputRef.current?.focus()
	}, [location.pathname])

	return (
		<div className="flex justify-center items-center w-full">
			<div className="relative w-full">
				<HiMagnifyingGlass
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-900 dark:text-neutral-200"
					size={24}
				/>
				<input
					type="text"
					ref={inputRef}
					className="w-full pl-10 pr-10 border text-base h-14 bg-inherit font-medium
					dark:placeholder-zinc-400 rounded-full outline-none
					border-zinc-200 hover:border-zinc-400  focus:border-zinc-700
					dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus:border-zinc-300 dark:text-zinc-100"
					placeholder="Search for the creators and videos you love to love"
					value={videoClass.searchTerm || ""}
					onChange={e => videoClass.setSearchTerm(handleTypeUsername(e))}
					onKeyDown={handleSearch}
				/>
			</div>
		</div>
	)
}

export default observer(HomeScreenSearchBar)
