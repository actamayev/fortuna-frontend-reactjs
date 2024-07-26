import { useCallback } from "react"
import { PublicKey } from "@solana/web3.js"
import { useAuthContext } from "../../contexts/auth-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginOrRegisterSuccess) => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	return useCallback((authData: LoginOrRegisterSuccess): void => {
		fortunaApiClient.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
		solanaClass.walletPublicKey = new PublicKey(authData.publicKey)
	}, [authClass, fortunaApiClient.httpClient, solanaClass])
}
