import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo, useRef } from "react"
import Button from "../button"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>
}

function ChooseProfilePictureButton(props: Props) {
	const { previewUrl, setPreviewUrl, setSelectedImage } = props
	const fileInputRef = useRef<HTMLInputElement>(null)
	const personalInfoClass = usePersonalInfoContext()

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 150MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}
			setSelectedImage(file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			setSelectedImage(null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [setPreviewUrl, setSelectedImage])

	const chooseProfilePictureButtonTitle = useMemo(() => {
		if (_.isNull(personalInfoClass)) return ""
		if (_.isNil(personalInfoClass.profilePictureUrl)) {
			return "Choose a Profile Picture"
		}
		return "Choose a new Profile Picture"
	}, [personalInfoClass])

	// Do not remove this just because it doesn't appear in the JSX.
	// This button just shouldn't show if there is a previewUrl
	if (!_.isNull(previewUrl)) return null

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/jpeg, image/png"
				style={{ display: "none" }}
				max={1}
			/>
			<Button
				title={chooseProfilePictureButtonTitle}
				colorClass="bg-sky-300"
				hoverClass="hover:bg-sky-400"
				onClick={() => fileInputRef.current?.click()}
				className="font-semibold"
			/>
		</>
	)
}

export default observer(ChooseProfilePictureButton)
