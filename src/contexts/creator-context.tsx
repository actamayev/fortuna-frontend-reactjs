import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class CreatorClass {
	private _myContent: MyContent[] = []

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public newVideoDetails: NewVideoDetails = {
		videoName: "",
		description: "",
		selectedImage: null,
		selectedVideo: null,
		isContentExclusive: true,
		tierData: [{
			tierNumber: 1,
			tierDiscount: 0,
			purchasesInThisTier: null,
			listingPriceToAccessUsd: 0.5
		}]
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

	public setIsNewVideoLoading = action((newState: boolean): void => {
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

	public updateNewVideoDetails = action(<K extends keyof NewVideoDetails>(
		key: K, value: NewVideoDetails[K]
	) => {

		if (typeof this.newVideoDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.newVideoDetails[key] = value
		if (key === "isContentExclusive") {
			if (value === false || !_.isEmpty(this.newVideoDetails.tierData)) return
			this.newVideoDetails.tierData = [{
				tierNumber: 1,
				tierDiscount: 0,
				purchasesInThisTier: null,
				listingPriceToAccessUsd: 0.5
			}]
		}
	})

	public updateNewVideoTierDetails = action(<K extends keyof TierData>(
		key: K, tierNumber: number, value: TierData[K]
	) => {
		if (key === "purchasesInThisTier") {
			this.newVideoDetails.tierData[tierNumber - 1][key] = value
			return
		}
		if (key === "tierDiscount") {
			this.newVideoDetails.tierData[tierNumber - 1].tierDiscount = value as number
			this.newVideoDetails.tierData[tierNumber - 1].listingPriceToAccessUsd =
				(1 - ((value as number) / 100)) * this.lowestTierPrice
			return
		}

		this.newVideoDetails.tierData[tierNumber - 1][key] = value
	})

	public areThereMoreTiers(tierNumber: number): boolean {
		return this.newVideoDetails.tierData.length > tierNumber
	}

	get canAnotherTierBeAdded(): boolean {
		return this.newVideoDetails.tierData.length < 3
	}

	get lowestTierPrice(): number {
		return this.newVideoDetails.tierData[this.newVideoDetails.tierData.length - 1].listingPriceToAccessUsd
	}

	public addVideoTier() {
		if (this.newVideoDetails.tierData.length >= 3) return
		this.newVideoDetails.tierData.push({
			tierNumber: this.newVideoDetails.tierData.length + 1,
			tierDiscount: 0,
			purchasesInThisTier: null,
			listingPriceToAccessUsd: 0.5
		})
		this.resetVideoTierDetailsAboveLowestTier()
	}

	public deleteTier(tierNumber: number) {
		this.newVideoDetails.tierData = this.newVideoDetails.tierData.filter(tier => tier.tierNumber !== tierNumber)
	}

	private resetVideoTierDetailsAboveLowestTier () {
		for (const tier of this.newVideoDetails.tierData) {
			if (tier.tierNumber === this.newVideoDetails.tierData.length) return
			if (!_.isNull(this.newVideoDetails.tierData[tier.tierNumber - 1].purchasesInThisTier)) continue
			this.newVideoDetails.tierData[tier.tierNumber - 1].purchasesInThisTier = 100
		}
	}

	get doesNewVideoLimitNumberBuyers(): boolean {
		return this.newVideoDetails.tierData[this.newVideoDetails.tierData.length - 1].purchasesInThisTier !== null
	}

	get maxProfitFromNewVideo(): number | null {
		const { tierData } = this.newVideoDetails

		// If any of the tier data's purchasesInThisTier is null, return null
		if (tierData.some(tier => tier.purchasesInThisTier === null)) return null

		// Sort tier data by tier number to ensure correct order
		const sortedTiers = _.sortBy(tierData, "tierNumber")
		let maxProfit = 0

		// Calculate profit for each tier
		sortedTiers.forEach(tier => {
			maxProfit += (tier.purchasesInThisTier as number) *
				this.lowestTierPrice *
				(1 - (tier.tierDiscount / 100))
		})

		return maxProfit * 0.975 // 2.5% Fortuna fee
	}

	public setHasContentToRetrieve = action((newState: boolean): void => {
		this.hasContentToRetrieve = newState
	})

	public setIsRetrievingContent = action((newState: boolean): void => {
		this.isRetrievingContent = newState
	})

	public resetNewVideoDetails = action(() => {
		this.newVideoDetails = {
			videoName: "",
			description: "",
			selectedImage: null,
			selectedVideo: null,
			isContentExclusive: true,
			tierData: [{
				tierNumber: 1,
				tierDiscount: 0,
				purchasesInThisTier: null,
				listingPriceToAccessUsd: 0.5
			}]
		}
	})

	public logout() {
		this.myContent = []
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false

		this.resetNewVideoDetails()
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
