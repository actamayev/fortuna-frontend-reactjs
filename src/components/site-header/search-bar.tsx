import _ from "lodash"
import { observer } from "mobx-react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import useVideoSearch from "../../hooks/search/video-search"
import { useVideoContext } from "../../contexts/video-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"

function SearchBar() {
	const navigate = useTypedNavigate()
	const videoClass = useVideoContext()
	const location = useLocation()
	const videoSearch = useVideoSearch()
	const handleTypeUsername = useHandleTypeUsername()
	const inputRef = useRef<HTMLInputElement>(null)
	const [isFocused, setIsFocused] = useState(false)

	const handleSearch = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key !== "Enter" ||
			_.isNull(videoClass.searchTerm) ||
			_.isEmpty(videoClass.searchTerm.trim())
		) return
		await videoSearch()
		if (location.pathname !== (`/s/${videoClass.searchTerm}`)) {
			navigate(`/s/${videoClass.searchTerm}`)
		}
	}, [location.pathname, navigate, videoClass.searchTerm, videoSearch])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

	useEffect(() => {
		if (location.pathname !== "/") return
		inputRef.current?.focus()
	}, [location.pathname])

	return (
		<div className="flex justify-center items-center w-full">
			<div
				className="relative"
				style={{ width: "30%" }}
			>
				<HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-900 dark:text-neutral-200" />
				<input
					type="text"
					ref={inputRef}
					className="w-full pl-10 pr-10 p-1.5 border text-sm h-11 bg-inherit
						placeholder-neutral-500 rounded-[3px] outline-none \
						border-zinc-200 hover:border-zinc-400  focus:border-zinc-700 \
						dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus:border-zinc-300 dark:text-zinc-200"
					placeholder="Search"
					value={videoClass.searchTerm || ""}
					onChange={e => videoClass.setSearchTerm(handleTypeUsername(e))}
					onKeyDown={handleSearch}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					style={{ fontWeight: "350" }}
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

export default observer(SearchBar)
