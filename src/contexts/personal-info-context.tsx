import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"
import { isValidCurrency, isValidSiteTheme } from "../utils/type-checks"

class PersonalInfoClass {
	public username: string | null = null
	public email: string | null = null

	public isRetrievingPersonalInfo = false
	public defaultCurrency: Currencies = "usd"
	public defaultSiteTheme: SiteThemes = "light"

	constructor() {
		makeAutoObservable(this)
		this.setDefaultsFromLocalStorage()
	}

	private setDefaultsFromLocalStorage(): void {
		const locallyStoredDefaultCurrency = localStorage.getItem("defaultCurrency")
		if (isValidCurrency(locallyStoredDefaultCurrency)) {
			this.setDefaultCurrency(locallyStoredDefaultCurrency)
		}
		const locallyStoredDefaultSiteTheme = localStorage.getItem("defaultSiteTheme")
		if (isValidSiteTheme(locallyStoredDefaultSiteTheme)) {
			this.setDefaultSiteTheme(locallyStoredDefaultSiteTheme)
		}
	}

	public setIsRetrievingPersonalDetails = action((newState: boolean): void => {
		this.isRetrievingPersonalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.setDefaultCurrency(retrievedData.defaultCurrency)
		this.setDefaultSiteTheme(retrievedData.defaultSiteTheme)
	})

	public setDefaultCurrency = action((newDefaultCurrency: Currencies, addToLocalStorage: boolean = true): void => {
		this.defaultCurrency = newDefaultCurrency
		if (addToLocalStorage === true) localStorage.setItem("defaultCurrency", newDefaultCurrency)
	})

	public setDefaultSiteTheme = action((newSiteTheme: SiteThemes, addToLocalStorage: boolean = true): void => {
		this.defaultSiteTheme = newSiteTheme
		if (addToLocalStorage === true) localStorage.setItem("defaultSiteTheme", newSiteTheme)
		if (newSiteTheme === "dark") document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	})

	public logout() {
		this.username = null
		this.email = null
		this.setIsRetrievingPersonalDetails(false)
	}
}

const PersonalInfoContext = createContext(new PersonalInfoClass())

export default function PersonalInfoProvider ({ children }: { children: React.ReactNode }) {
	const value = useMemo(() => new PersonalInfoClass(), [])

	return (
		<PersonalInfoContext.Provider value={value}>
			{children}
		</PersonalInfoContext.Provider>
	)
}

export const usePersonalInfoContext = () => useContext(PersonalInfoContext)
