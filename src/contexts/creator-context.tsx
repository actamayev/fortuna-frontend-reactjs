import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class CreatorClass {
	private _myContent: MyContent[] = []

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public newVideoDetails: NewVideoDetails = {
		videoName: "",
		listingPriceToAccessUsd: 0.5,
		description: "",
		selectedImage: null,
		selectedVideo: null,
		isContentExclusive: false,
		tierData: []
	}
	public isNewVideoLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	get myContent(): MyContent[] {
		return this._myContent
	}

	set myContent(myContent: MyContent[]) {
		this._myContent = myContent
	}

	private contextForMyContent(uuid: string): MyContent | undefined {
		return this.myContent.find(content => content.uuid === uuid)
	}

	public setIsNewSplLoading = action((newState: boolean): void => {
		this.isNewVideoLoading = newState
	})

	public setContent = action((newContentList: MyContent[]): void => {
		this.myContent = []
		if (_.isEmpty(newContentList)) return
		newContentList.map(singleNewContent => this.addContent(singleNewContent))
	})

	public addContent = action((newContent: MyContent): void => {
		const retrievedContent = this.contextForMyContent(newContent.uuid)
		if (!_.isUndefined(retrievedContent)) return
		this.myContent.unshift(newContent)
	})

	public checkIfUuidExistsInContentList(uuid: string): boolean {
		for (const content of this.myContent) {
			if (_.isEqual(content.uuid, uuid)) return true
		}
		return false
	}

	public updateNewSplDetails = action(<K extends keyof NewVideoDetails>(
		key: K, value: NewVideoDetails[K]
	) => {

		if (typeof this.newVideoDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.newVideoDetails[key] = value
		if (key === "isContentExclusive" && value === true) {
			if (_.isEmpty(this.newVideoDetails.tierData)) {
				this.newVideoDetails.tierData = [{
					tierNumber: 1,
					purchasesInThisTier: 100,
					tierDiscount: 20
				}]
			}
		}
	})

	public setHasContentToRetrieve = action((newState: boolean): void => {
		this.hasContentToRetrieve = newState
	})

	public setIsRetrievingContent = action((newState: boolean): void => {
		this.isRetrievingContent = newState
	})

	public resetNewSplDetails = action(() => {
		this.newVideoDetails = {
			videoName: "",
			listingPriceToAccessUsd: 0.5,
			description: "",
			selectedImage: null,
			selectedVideo: null,
			isContentExclusive: false,
			tierData: []
		}
	})

	public logout() {
		this.myContent = []
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false

		this.resetNewSplDetails()
		this.isNewVideoLoading = false
	}
}

const CreatorContext = createContext<CreatorClass | null>(null)

export default function CreatorProvider ({ children }: { children: React.ReactNode }) {
	const creatorClass = useMemo(() => new CreatorClass(), [])

	return (
		<CreatorContext.Provider value={creatorClass}>
			{children}
		</CreatorContext.Provider>
	)
}

export const useCreatorContext = () => useContext(CreatorContext)
