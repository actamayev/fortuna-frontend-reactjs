import { createContext, useContext, useMemo } from "react"
import { makeAutoObservable } from "mobx"

class PersonalInfoClass {
	private _username: string | null = null
	private _email?: string | null = null
	private _phoneNumber?: string | null = null

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

	public logout() {
		this.email = null
		this.phoneNumber = null
		this.username = null
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
