import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class YouTubeClass {
	// FUTURE TODO: Later, add the user's Youtube subscriptions data, # subscribers here
	private _hasYouTubeAccessTokens: boolean | null = null
	private _hasYouTubeDataBeenRetrieved: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	get hasYouTubeAccessTokens(): boolean | null {
		return this._hasYouTubeAccessTokens
	}

	set hasYouTubeAccessTokens(hasYouTubeAccessTokens: boolean | null) {
		this._hasYouTubeAccessTokens = hasYouTubeAccessTokens
	}

	get hasYouTubeDataBeenRetrieved(): boolean {
		return this._hasYouTubeDataBeenRetrieved
	}

	set hasYouTubeDataBeenRetrieved(hasYouTubeDataBeenRetrieved: boolean) {
		this._hasYouTubeDataBeenRetrieved = hasYouTubeDataBeenRetrieved
	}

	public setYouTubeClassData = action((youTubeData: UserYouTubeData) => {
		this.hasYouTubeAccessTokens = youTubeData.userHasYouTubeAccessTokens
		this.hasYouTubeDataBeenRetrieved = true
	})

	public logout() {
		this.hasYouTubeAccessTokens = null
		this.hasYouTubeDataBeenRetrieved = false
	}
}

const YouTubeContext = createContext<YouTubeClass | null>(null)

export default function YouTubeProvider ({ children }: { children: React.ReactNode }) {
	const value = useMemo(() => new YouTubeClass(), [])

	return (
		<YouTubeContext.Provider value={value}>
			{children}
		</YouTubeContext.Provider>
	)
}

export const useYoutTubeContext = () => useContext(YouTubeContext)

