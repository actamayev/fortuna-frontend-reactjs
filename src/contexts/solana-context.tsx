// import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class SolanaClass {
	// private _walletAddress: string | null = null
	// public myContentMap: Map<string, MyContent> = new Map()

	// constructor() {
	// 	makeAutoObservable(this)
	// }

	// get walletAddress(): string | null {
	// 	return this._walletAddress
	// }

	// set walletAddress(walletAddress: string | null) {
	// 	this._walletAddress = walletAddress
	// }

	// public contextForMyContent(splId: string): MyContent | undefined {
	// 	return this.myContentMap.get(splId)
	// }

	// public addContent = action((event: MyContent): void =>  {
	// 	if (this.myContentMap.has(event.splId)) return
	// 	this.myContentMap.set(event.splId, event)
	// })

	// public logout() {
	// 	this.walletAddress = null
	// 	this.myContentMap.clear()
	// }
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
