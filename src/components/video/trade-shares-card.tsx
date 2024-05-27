import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import PurchasePrimarySharesOptions from "./purchase-primary-shares/purchase-primary-shares-options"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

interface Props {
	videoUUID: string
}

function TradeSharesCard(props: Props) {
	const { videoUUID } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass) || _.isUndefined(videoUUID)) return true
		return positionsAndTransactionsClass.checkIfUuidExistsInContentList(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass, positionsAndTransactionsClass?.myContent, videoUUID])

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title="Please create an account to purchase shares"
				className="font-semibold"
			/>
		)
	}

	if (wasVideoCreatedByUser === true) {
		return (
			<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-3 h-full">
				Unable to purchase own shares
			</div>
		)
	}

	return (
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-3 h-full">
			<PurchasePrimarySharesOptions />
		</div>
	)
}

export default observer(TradeSharesCard)
