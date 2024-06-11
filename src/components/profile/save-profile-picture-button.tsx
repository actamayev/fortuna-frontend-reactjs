import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaSave } from "react-icons/fa"
import Button from "../button"
import useUploadProfilePicture from "../../hooks/personal-info/upload-profile-picture"

interface Props {
	previewUrl: string | null
	selectedImage: File | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>
}

function SaveProfilePictureButton(props: Props) {
	const { previewUrl, selectedImage, setPreviewUrl, setSelectedImage } = props
	const uploadProfilePicture = useUploadProfilePicture()

	const uploadProfilePictureCallback = useCallback(async() => {
		await uploadProfilePicture(selectedImage, setSelectedImage, setPreviewUrl)
	}, [selectedImage, setPreviewUrl, setSelectedImage, uploadProfilePicture])

	if (_.isNull(previewUrl) || _.isNull(selectedImage)) return null

	return (
		<Button
			titleIcon={<FaSave/> }
			colorClass="bg-emerald-200"
			hoverClass="hover:bg-emerald-300"
			onClick={uploadProfilePictureCallback}
			className="font-semibold"
		/>
	)
}

export default observer(SaveProfilePictureButton)
