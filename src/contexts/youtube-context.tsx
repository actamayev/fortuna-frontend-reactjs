import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class YouTubeClass {
	// FUTURE TODO: Later, add the user's YouTube subscriptions data, # subscribers here
	private _hasYouTubeAccessTokens: boolean | null = null
	private _isRetrievingYouTubeData: boolean = false
	private _hasYouTubeDataBeenRetrieved: boolean = false
	private _subscriberCount: number | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get hasYouTubeAccessTokens(): boolean | null {
		return this._hasYouTubeAccessTokens
	}

	set hasYouTubeAccessTokens(hasYouTubeAccessTokens: boolean | null) {
		this._hasYouTubeAccessTokens = hasYouTubeAccessTokens
	}

	get isRetrievingYouTubeData(): boolean {
		return this._isRetrievingYouTubeData
	}

	set isRetrievingYouTubeData(isRetrievingYouTubeData: boolean) {
		this._isRetrievingYouTubeData = isRetrievingYouTubeData
	}

	get hasYouTubeDataBeenRetrieved(): boolean {
		return this._hasYouTubeDataBeenRetrieved
	}

	set hasYouTubeDataBeenRetrieved(hasYouTubeDataBeenRetrieved: boolean) {
		this._hasYouTubeDataBeenRetrieved = hasYouTubeDataBeenRetrieved
	}

	get subscriberCount(): number | null {
		return this._subscriberCount
	}

	set subscriberCount(subscriberCount: number | null) {
		this._subscriberCount = subscriberCount
	}

	public setYouTubeClassData = action((youtubeData: UserYouTubeData) => {
		this.hasYouTubeAccessTokens = youtubeData.userHasYouTubeAccessTokens
		this.subscriberCount = youtubeData.subscriberCount
		this.hasYouTubeDataBeenRetrieved = true
	})

	public logout() {
		this.hasYouTubeAccessTokens = null
		this.isRetrievingYouTubeData = false
		this.hasYouTubeDataBeenRetrieved = false
		this.subscriberCount = null
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

export const useYouTubeContext = () => useContext(YouTubeContext)

