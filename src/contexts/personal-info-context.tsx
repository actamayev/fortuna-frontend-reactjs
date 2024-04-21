import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PersonalInfoClass {
	private _username: string | null = null
	private _email?: string | null = null
	private _phoneNumber?: string | null = null

	// TODO: Figure out how to make these properties read-able, but not writeable from outside the class.
	// they should only be written to via the action functions within the class
	public isRetrievingPersonalInfo = false
	public defaultCurrency: Currencies = "usd"
	public siteTheme: SiteThemes = "light"

	constructor() {
		makeAutoObservable(this)
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

	public setIsRetrievingPersonalDetails = action((newState: boolean): void => {
		this.isRetrievingPersonalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.phoneNumber = retrievedData.phoneNumber
		this.setDefaultCurrency(retrievedData.defaultCurrency)
		this.setSiteTheme(retrievedData.defaultSiteTheme)
	})

	public setDefaultCurrency = action((newDefaultCurrency: Currencies): void => {
		this.defaultCurrency = newDefaultCurrency
	})

	public setSiteTheme = action((newSiteTheme: SiteThemes): void => {
		this.siteTheme = newSiteTheme
		if (newSiteTheme === "dark") document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	})

	public logout() {
		this.username = null
		this.email = null
		this.phoneNumber = null
		this.isRetrievingPersonalInfo = false
		// do not change the default currency back to usd after logout.
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
