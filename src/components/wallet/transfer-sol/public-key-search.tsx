import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

interface Props {
	transferSolDetails: TransferSolDetails
	setTransferSolDetails: React.Dispatch<React.SetStateAction<TransferSolDetails>>
}

function PublicKeySearch(props: Props) {
	const { transferSolDetails, setTransferSolDetails } = props
	const [isLoading, setIsLoading] = useState(false)
	const fortunaApiClient = useApiClientContext()

	const handleSearch = useCallback(async () => {
		try {
			if (!_.isEqual(transferSolDetails.publicKey.length, 44)) return
			setIsLoading(true)
			setTransferSolDetails({ ...transferSolDetails, doesPublicKeyExist: false })

			const publicKeyOnFortunaResponse = await fortunaApiClient.searchDataService.checkIfPublicKeyRegisteredOnFortuna(transferSolDetails.publicKey)
			if (!_.isEqual(publicKeyOnFortunaResponse.status, 200) || isErrorResponses(publicKeyOnFortunaResponse.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyOnFortunaResponse.data.exists === true) {
				setTransferSolDetails({ ...transferSolDetails, doesPublicKeyExist: true })
				return
			}

			const publicKeyExistsOnSolana = await fortunaApiClient.searchDataService.checkIfPublicKeyExistsOnSolana(transferSolDetails.publicKey)
			if (!_.isEqual(publicKeyExistsOnSolana.status, 200) || isErrorResponses(publicKeyExistsOnSolana.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyExistsOnSolana.data.exists === true) {
				setTransferSolDetails({ ...transferSolDetails, doesPublicKeyExist: true })
				return
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fortunaApiClient.searchDataService, transferSolDetails.publicKey])

	useEffect(() => {
		void handleSearch()
	}, [handleSearch])

	return (
		<>
			<input
				type="text"
				value={transferSolDetails.publicKey}
				onChange={(e) => setTransferSolDetails({ ...transferSolDetails, publicKey: e.target.value})}
				className="border rounded-lg p-2"
				placeholder="123XYZ"
			/>
			{isLoading && (<>Loading...</>)}
		</>
	)
}

export default observer(PublicKeySearch)
