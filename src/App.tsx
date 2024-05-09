import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Creator from "./pages/creator"
import Missing from "./pages/missing"
import MyWallet from "./pages/my-wallet"
import MyProfile from "./pages/my-profile"
import LoginPage from "./pages/auth/login-page"
import SearchResults from "./pages/search-results"
import RegisterPage from "./pages/auth/register-page"
import MyOwnership from "./pages/supporter/my-ownership"
import RegisterUsername from "./pages/auth/register-username"
import PrivacyPolicy from "./pages/compliance/privacy-policy"

import CreatorRoutes from "./routes/creator-routes"

import useRetrieveMyContent from "./hooks/solana/retrieve-my-content"
import useRetrieveMyOwnership from "./hooks/solana/retrieve-my-ownership"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useInitializeTagManager from "./hooks/analytics/initiallize-tag-manager"
import useRetrieveSolPriceUseEffect from "./hooks/solana/retrieve-sol-price-use-effect"
import useRetrieveYouTubeInfoUseEffect from "./hooks/google/retrieve-youtube-info-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/wallet-balance/retrieve-wallet-balance-use-effect"
import useResetPurchaseSplAfterNavigation from "./hooks/solana/purchase-spl-tokens/reset-purchase-spl-after-navigation"

function App() {
	// Don't change the getAuthData to a useEffect, or else it doesn't work immediately after login
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()
	useRetrieveSolPriceUseEffect()
	useRetrieveMyContent()
	useRetrieveMyOwnership()
	useInitializeTagManager()
	useResetPurchaseSplAfterNavigation()
	useRedirectBackToRegisterUsername()
	useRetrieveYouTubeInfoUseEffect()

	return (
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "/login" element = {<LoginPage />} />
			<Route path = "/register" element = {<RegisterPage />} />
			<Route path = "/register-username" element = {<RegisterUsername />} />

			<Route path = "/my-ownership" element = {<MyOwnership />} />
			<Route path = "/my-wallet" element = {<MyWallet />} />
			<Route path = "/v/:videoUUID" element = {<Video />} />
			<Route path = "/my-profile" element = {<MyProfile />} />
			<Route path = "/c/:creatorUsername" element = {<Creator />} />
			<Route path = "/s/:searchTerm" element = {<SearchResults />} />

			<Route path = "/creator/*" element = {<CreatorRoutes />} />

			<Route path = "/privacy-policy" element = {<PrivacyPolicy />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}

// Do not remove this observer or else auth data doesn't set immediately after login.
export default observer(App)
