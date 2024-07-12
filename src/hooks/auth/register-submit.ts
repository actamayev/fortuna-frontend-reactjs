import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	whereToNavigate: PageNames,
	registerCredentials: RegisterCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()
	const setDataAfterRegister = useSetDataAfterLoginOrRegister()

	return useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...restOfCredentials } = registerCredentials

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "light"
			if (siteThemeFromStorage === "dark") siteTheme = "dark"

			const response = await fortunaApiClient.authDataService.register({ ...restOfCredentials, siteTheme })

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload page and try again.")
				return
			}
			setDataAfterRegister(response.data)
			videoClass.clearVideosOnLogin()
			navigate(whereToNavigate)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to Register")
		} finally {
			setLoading(false)
		}
	}, [fortunaApiClient.authDataService, navigate, registerCredentials,
		setDataAfterRegister, setError, setLoading, videoClass, whereToNavigate])
}
