import { useCallback, useEffect, useState } from "react"
import PageHelmet from "../components/helmet/page-helmet"
import useRetrieveHomePageVideos from "../hooks/videos/retrieve-home-page-data"
import HomePageCreatorsMap from "../components/home-page/home-page-creators-map"
import HomeScreenSearchBar from "../components/search-bars/home-screen-search-bar"

export default function Home() {
	const [minHeight, setMinHeight] = useState("100vh")
	useRetrieveHomePageVideos()

	const handleResize = useCallback(() => {
		const footerHeight = document.getElementById("footer")?.offsetHeight || 0
		const headerHeight = document.getElementById("header")?.offsetHeight || 0
		const viewportHeight = window.innerHeight
		const contentMinHeight = viewportHeight - headerHeight - footerHeight
		setMinHeight(`${contentMinHeight}px`)
	}, [])

	useEffect(() => {
		window.addEventListener("resize", handleResize)
		handleResize()

		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

	// TODO: Add: Popular channels (by # of likes?)
	// TODO: Add: recent uploads (literally the last 5 videos published)
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div style={{ minHeight }}>
				<div className="flex justify-center items-center w-full min-h-[50vh]">
					<div className="w-full max-w-2xl">
						<div className="flex flex-col items-center">
							<div className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-50 text-center">
								Find creators and videos
							</div>
							<HomeScreenSearchBar />
						</div>
						<HomePageCreatorsMap />
					</div>
				</div>
			</div>
		</>
	)
}
