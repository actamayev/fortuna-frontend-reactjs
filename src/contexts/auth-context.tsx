import _ from "lodash"
import { makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class AuthClass {
	private _accessToken: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	set accessToken(accessToken: string | null) {
		this._accessToken = accessToken
	}

	public getAuthDataFromStorage(): void {
		const storedAccessToken = sessionStorage.getItem("Access Token")
		if (!_.isUndefined(storedAccessToken)) this.accessToken = storedAccessToken
	}

	public setAccessToken(accessToken: string | null): void {
		this.accessToken = accessToken
		if (!_.isNull(accessToken)) sessionStorage.setItem("Access Token", accessToken as string)
	}

	public logout() {
		this.accessToken = null
	}
}

const AuthContext = createContext(new AuthClass())

export default function AuthProvider ({ children }: { children: React.ReactNode }) {
	const authClass = useMemo(() => new AuthClass(), [])

	return (
		<AuthContext.Provider value={authClass}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
