import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Wallet from "./pages/wallet"
import Creator from "./pages/creator"
import Missing from "./pages/missing"
import Ownership from "./pages/ownership"
import Contact from "./pages/company/contact"
import LoginPage from "./pages/auth/login-page"
import RecentUploads from "./pages/recent-uploads"
import SearchResults from "./pages/search-results"
import RegisterPage from "./pages/auth/register-page"
import RegisterUsername from "./pages/auth/register-username"

import CreatorRoutes from "./routes/creator-routes"

import useScrollToTop from "./hooks/scroll-to-top"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useInitializeTagManager from "./hooks/analytics/initiallize-tag-manager"
import useLogoutListenerUseEffect from "./hooks/listeners/logout-listener-use-effect"
import useRetrieveSolPriceUseEffect from "./hooks/solana/retrieve-sol-price-use-effect"
import useRetrieveMyContentUseEffect from "./hooks/creator/retrieve-my-content-use-effect"
import useSiteThemeListenerUseEffect from "./hooks/listeners/site-theme-listener-use-effect"
import useRetrieveCreatorInfoUseEffect from "./hooks/creator/retrieve-creator-info-use-effect"
import useRetrieveMyPurchasedExclusiveContentUseEffect
	from "./hooks/positions-and-transactions/retrieve-my-purchased-exclusive-content-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/retrieve-wallet-balance-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import useDefaultCurrencyListenerUseEffect from "./hooks/listeners/default-currency-listener-use-effect"
import useResetInstantAccessStageOnLocationChangeUseEffect from "./hooks/market/reset-instant-access-stage-on-location-change-use-effect"

function App() {
	// Don't change the getAuthData to a useEffect, or else it doesn't work immediately after login
	useScrollToTop()
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useDefaultCurrencyListenerUseEffect()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()
	useRetrieveCreatorInfoUseEffect()
	useRetrieveSolPriceUseEffect()
	useRetrieveMyContentUseEffect()
	useRetrieveMyPurchasedExclusiveContentUseEffect()
	useInitializeTagManager()
	useRedirectBackToRegisterUsername()
	useResetInstantAccessStageOnLocationChangeUseEffect()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/register-username" element={<RegisterUsername />} />

			<Route path="/ownership" element={<Ownership />} />
			<Route path="/wallet" element={<Wallet />} />

			<Route path="/recent-uploads" element={<RecentUploads />} />
			<Route path="/v/:videoUUID" element={<Video />} />
			<Route path="/c/:creatorUsername" element={<Creator />} />
			<Route path="/s/:searchTerm" element={<SearchResults />} />

			<Route path="/creator/*" element={<CreatorRoutes />} />

			<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Missing />} />
		</Routes>
	)
}

// Do not remove this observer or else auth data doesn't set immediately after login.
export default observer(App)
