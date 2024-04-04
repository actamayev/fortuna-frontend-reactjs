import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class SolanaClass {
	private _walletAddress: string | null = null
	public myContentMap: Map<string, MyContent> = new Map()
	public hasContentToRetrieve = true // might need to make setting this an action

	constructor() {
		makeAutoObservable(this)
	}

	get walletAddress(): string | null {
		return this._walletAddress
	}

	set walletAddress(walletAddress: string | null) {
		this._walletAddress = walletAddress
	}

	public contextForMyContent(mintAddress: string): MyContent | undefined {
		return this.myContentMap.get(mintAddress)
	}

	public addContent = action((newContent: MyContent): void =>  {
		if (this.myContentMap.has(newContent.mintAddress)) return
		this.myContentMap.set(newContent.mintAddress, newContent)
	})

	public logout() {
		this.walletAddress = null
		this.myContentMap.clear()
	}
}

const SolanaContext = createContext<SolanaClass | null>(null)

export default function SolanaProvider ({ children }: { children: React.ReactNode }) {
	const solanaClass = useMemo(() => new SolanaClass(), [])

	return (
		<SolanaContext.Provider value={solanaClass}>
			{children}
		</SolanaContext.Provider>
	)
}

export const useSolanaContext = () => useContext(SolanaContext)
