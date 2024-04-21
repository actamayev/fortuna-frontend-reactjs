import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"
import { isValidCurrency, isValidSiteTheme } from "../utils/type-checks"

class PersonalInfoClass {
	private _username: string | null = null
	private _email?: string | null = null
	private _phoneNumber?: string | null = null

	private _isRetrievingPersonalInfo = false
	private _defaultCurrency: Currencies = "usd"
	private _defaultSiteTheme: SiteThemes = "light"

	constructor() {
		makeAutoObservable(this)
		this.setDefaultsFromLocalStorage()
	}

	get username(): string | null {
		return this._username
	}

	set username(username: string | null) {
		this._username = username
	}

	get email(): string | null | undefined {
		return this._email
	}

	set email(email: string | null | undefined) {
		this._email = email
	}

	get phoneNumber(): string | null | undefined {
		return this._phoneNumber
	}

	set phoneNumber(phoneNumber: string | null | undefined) {
		this._phoneNumber = phoneNumber
	}

	public getIsRetrievingPersonalInfo(): boolean {
		return this._isRetrievingPersonalInfo
	}

	public getDefaultCurrency(): Currencies {
		return this._defaultCurrency
	}

	public getDefaultSiteTheme(): SiteThemes {
		return this._defaultSiteTheme
	}

	private setDefaultsFromLocalStorage(): void {
		const locallyStoredDefaultCurrency = localStorage.getItem("defaultCurrency")
		if (isValidCurrency(locallyStoredDefaultCurrency)) {
			this.setDefaultCurrency(locallyStoredDefaultCurrency)
		}
		const locallyStoredDefaultSiteTheme = localStorage.getItem("defaultSiteTime")
		if (isValidSiteTheme(locallyStoredDefaultSiteTheme)) {
			this.setDefaultSiteTheme(locallyStoredDefaultSiteTheme)
		}
	}

	public setIsRetrievingPersonalDetails = action((newState: boolean): void => {
		this._isRetrievingPersonalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.phoneNumber = retrievedData.phoneNumber
		this.setDefaultCurrency(retrievedData.defaultCurrency)
		this.setDefaultSiteTheme(retrievedData.defaultSiteTheme)
	})

	public setDefaultCurrency = action((newDefaultCurrency: Currencies): void => {
		this._defaultCurrency = newDefaultCurrency
		localStorage.setItem("defaultCurrency", newDefaultCurrency)
	})

	public setDefaultSiteTheme = action((newSiteTheme: SiteThemes): void => {
		this._defaultSiteTheme = newSiteTheme
		localStorage.setItem("defaultSiteTime", newSiteTheme)
		if (newSiteTheme === "dark") document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	})

	public logout() {
		this.username = null
		this.email = null
		this.phoneNumber = null
		this.setIsRetrievingPersonalDetails(false)
	}
}

const PersonalInfoContext = createContext<PersonalInfoClass | null>(null)

export default function PersonalInfoProvider ({ children }: { children: React.ReactNode }) {
	const value = useMemo(() => new PersonalInfoClass(), [])

	return (
		<PersonalInfoContext.Provider value={value}>
			{children}
		</PersonalInfoContext.Provider>
	)
}

export const usePersonalInfoContext = () => useContext(PersonalInfoContext)
