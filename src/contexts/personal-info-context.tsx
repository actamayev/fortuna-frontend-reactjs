import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PersonalInfoClass {
	private _username: string | null = null
	private _email?: string | null = null
	private _phoneNumber?: string | null = null

	public isRetrievingPersonalInfo = false
	public defaultCurrency: Currencies = "usd"

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
	})

	public setDefaultCurrency = action((newDefaultCurrency: Currencies): void => {
		this.defaultCurrency = newDefaultCurrency
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
