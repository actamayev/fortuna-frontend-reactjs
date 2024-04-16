import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Video from "./pages/video"
import Missing from "./pages/missing"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"
import MyOwnership from "./pages/supporter/my-ownership"
import SupporterWallet from "./pages/supporter/supporter-wallet"

import CreatorRoutes from "./routes/creator-routes"

import useGetAuthDataFromStorageUseEffect from "./utils/auth/get-auth-data-from-storage-use-effect"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import useRetrieveWalletBalanceUseEffect from "./hooks/solana/wallet-balance/retrieve-wallet-balance-use-effect"

export default function App() {
	useGetAuthDataFromStorageUseEffect()
	useRetrieveWalletBalanceUseEffect()
	useRetrievePersonalInfoUseEffect()

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
