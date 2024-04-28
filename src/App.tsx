import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Creator from "./pages/creator"
import Missing from "./pages/missing"
import MyProfile from "./pages/my-profile"
import LoginPage from "./pages/auth/login-page"
import SearchResults from "./pages/search-results"
import RegisterPage from "./pages/auth/register-page"
import MyOwnership from "./pages/supporter/my-ownership"
import SupporterWallet from "./pages/supporter/supporter-wallet"

import CreatorRoutes from "./routes/creator-routes"

import useRetrieveMyContent from "./hooks/solana/retrieve-my-content"
import useRetrieveMyOwnership from "./hooks/solana/retrieve-my-ownership"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useInitializeTagManager from "./hooks/analytics/initiallize-tag-manager"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/wallet-balance/retrieve-wallet-balance-use-effect"

function App() {
	// Don't change the getAuthData to a useEffect, or else it doesn't work immediately after login
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()
	useRetrieveMyContent()
	useRetrieveMyOwnership()
	useInitializeTagManager()

	return (
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "/login" element = {<LoginPage />} />
			<Route path = "/register" element = {<RegisterPage />} />
			<Route path = "/my-ownership" element = {<MyOwnership />} />
			<Route path = "/my-wallet" element = {<SupporterWallet />} />
			<Route path = "/v/:videoUUID" element = {<Video />} />
			<Route path = "/my-profile" element = {<MyProfile />} />
			<Route path = "/c/:creatorUsername" element = {<Creator />} />
			<Route path = "/s/:searchTerm" element = {<SearchResults />} />

			<Route path = "/creator/*" element = {<CreatorRoutes />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}

// Do not remove this observer or else auth data doesn't set immediately after login.
export default observer(App)
