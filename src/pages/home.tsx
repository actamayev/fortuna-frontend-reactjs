import PageHelmet from "../components/helmet/page-helmet"
import HomeScreenSearchBar from "../components/search-bars/home-screen-search-bar"

// TODO: Make it scroll down to the footer, shouldn't show at first
export default function Home() {
	// TODO: Add: Popular channels (by # of likes?)
	// TODO: Add: recent uploads (literally the last 5 videos published)
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="flex justify-center items-center w-full min-h-[50vh]">
				<div className="w-full max-w-2xl px-4">
					<div className="flex flex-col items-center">
						<div className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-50 text-center">
							Find creators and videos
						</div>
						<HomeScreenSearchBar />
					</div>
				</div>
			</div>
		</>
	)
}
