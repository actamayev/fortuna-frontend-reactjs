import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Missing from "./pages/missing"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"
import MyOwnership from "./pages/supporter/my-ownership"
import SupporterWallet from "./pages/supporter/supporter-wallet"

import CreatorRoutes from "./routes/creator-routes"

import useRetrieveMyContent from "./hooks/solana/retrieve-my-content"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/wallet-balance/retrieve-wallet-balance-use-effect"

function App() {
	// Don't change the getAuthData to a useEffect, or else it doesn't work immediately after login
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()
	useRetrieveMyContent()

	return (
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "/login" element = {<LoginPage />} />
			<Route path = "/register" element = {<RegisterPage />} />
			<Route path = "/my-ownership" element = {<MyOwnership />} />
			<Route path = "/my-wallet" element = {<SupporterWallet />} />
			<Route path = "/v/:videoUUID" element = {<Video />} />

			<Route path = "/creator/*" element = {<CreatorRoutes />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}

// Do not remove this observer or else auth data doesn't set immediately after login.
export default observer(App)
