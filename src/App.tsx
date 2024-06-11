import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Creator from "./pages/creator"
import Missing from "./pages/missing"
import MyWallet from "./pages/my-wallet"
import About from "./pages/company/about"
import MyProfile from "./pages/my-profile"
import Contact from "./pages/company/contact"
import Careers from "./pages/company/careers"
import LoginPage from "./pages/auth/login-page"
import SearchResults from "./pages/search-results"
import RegisterPage from "./pages/auth/register-page"
import MyOwnership from "./pages/supporter/my-ownership"
import PrivacyPolicy from "./pages/support/privacy-policy"
import RegisterUsername from "./pages/auth/register-username"

import CreatorRoutes from "./routes/creator-routes"

import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useInitializeTagManager from "./hooks/analytics/initiallize-tag-manager"
import useLogoutListenerUseEffect from "./hooks/auth/logout-listener-use-effect"
import useRetrieveSolPriceUseEffect from "./hooks/solana/retrieve-sol-price-use-effect"
import useRetrieveMyContentUseEffect from "./hooks/creator/retrieve-my-content-use-effect"
import useRetrieveMyPurchasedExclusiveContentUseEffect
	from "./hooks/positions-and-transactions/retrieve-my-purchased-exclusive-content-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/retrieve-wallet-balance-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"

function App() {
	// Don't change the getAuthData to a useEffect, or else it doesn't work immediately after login
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()
	useRetrieveSolPriceUseEffect()
	useRetrieveMyContentUseEffect()
	useRetrieveMyPurchasedExclusiveContentUseEffect()
	useInitializeTagManager()
	useRedirectBackToRegisterUsername()

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

			<Route path = "/contact" element = {<Contact />} />
			<Route path = "/careers" element = {<Careers />} />
			<Route path = "/about" element = {<About />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}

// Do not remove this observer or else auth data doesn't set immediately after login.
export default observer(App)
