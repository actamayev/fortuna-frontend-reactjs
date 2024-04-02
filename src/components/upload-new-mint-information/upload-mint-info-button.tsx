import _ from "lodash"
import { useMemo, useState } from "react"
import Button from "../button"
import confirmNewSPLDetails from "../../utils/confirm-new-spl-details"
import useUploadMintInfoOnclick from "../../hooks/solana/upload-mint-info-onclick"

interface Props {
	selectedImage: File | null
	newSplDetails: NewSPLDetails
	setError: React.Dispatch<React.SetStateAction<string>>
}

export default function UploadMintInfoButton(props: Props) {
	const { newSplDetails, selectedImage, setError } = props
	const [loading, setLoading] = useState(false)
	const uploadMintInfoOnclick = useUploadMintInfoOnclick()

	const isReadyToSubmit = useMemo(() => {
		return confirmNewSPLDetails(newSplDetails) && !_.isNull(selectedImage)
	}, [newSplDetails, selectedImage])

	return (
		<Button
			title={isReadyToSubmit ? "Submit" : "Please finish fields and image"}
			disabled={!isReadyToSubmit || loading}
			colorClass="bg-yellow-400"
			hoverClass="hover:bg-yellow-500"
			onClick={() => {
				uploadMintInfoOnclick(newSplDetails, selectedImage, setError, setLoading)
			}}
		/>
	)
}
