import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useVideoContext } from "../../contexts/video-context"
import useHandleSearch from "../../hooks/search/handle-search"
import useHandleKeyDownUseEffect from "../../hooks/search/handle-key-down-use-effect"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"

function HeaderSearchBar() {
	const videoClass = useVideoContext()
	const location = useLocation()
	const handleTypeUsername = useHandleTypeUsername()
	const inputRef = useRef<HTMLInputElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const handleSearch = useHandleSearch()
	useHandleKeyDownUseEffect(inputRef)

	if (
		location.pathname === "/" ||
		location.pathname === "/login" ||
		location.pathname === "/register" ||
		location.pathname === "/register-username"
	) return null

	return (
		<div className="flex justify-center items-center w-full">
			<div
				className="relative"
				style={{ width: "30%" }}
			>
				<HiMagnifyingGlass
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-900 dark:text-neutral-200"
					size={24}
				/>
				<input
					type="text"
					ref={inputRef}
					className="w-full pl-10 pr-10 border text-sm h-12 bg-inherit font-medium
						dark:placeholder-zinc-400 rounded-full outline-none
						border-zinc-200 hover:border-zinc-400  focus:border-zinc-700
						dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus:border-zinc-300 dark:text-zinc-100"
					placeholder="Search for the creators and video you love to love"
					value={videoClass.searchTerm || ""}
					onChange={e => videoClass.setSearchTerm(handleTypeUsername(e))}
					onKeyDown={handleSearch}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				{!isFocused && (
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-500">
						/
					</span>
				)}
			</div>
		</div>
	)
}

export default observer(HeaderSearchBar)
