import { useCallback, useEffect, useState } from "react"
import PageHelmet from "../components/helmet/page-helmet"
import HomePageVideosMap from "../components/home-page/home-page-videos-map"
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
		const margin = 32 * 4 // 32 is the tailwind mt-32, multiplied by 4 to convert to pixels
		const contentMinHeight = viewportHeight - headerHeight - footerHeight - margin
		setMinHeight(`${contentMinHeight}px`)
	}, [])

	useEffect(() => {
		window.addEventListener("resize", handleResize)
		handleResize()

		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

	return (
		<>
			<PageHelmet pageTitle="/" />
			<div style={{ minHeight }}>
				<div className="flex justify-center w-full mt-32">
					<div className="w-full max-w-3xl">
						<div className="flex flex-col items-center">
							<div className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-50 text-center">
								Find creators and videos
							</div>
							<HomeScreenSearchBar />
						</div>
						<HomePageCreatorsMap />
						<HomePageVideosMap />
					</div>
				</div>
			</div>
		</>
	)
}
