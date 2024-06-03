import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useRef, ChangeEvent } from "react"
import Button from "../../button"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
}

function ChooseThumbnailToUploadButton(props: Props) {
	const { previewUrl, setPreviewUrl } = props
	const fileInputRef = useRef<HTMLInputElement>(null)
	const solanaClass = useSolanaContext()

	const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		if (_.isNull(solanaClass)) return
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
			solanaClass.updateNewSplDetails("selectedImage", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			solanaClass.updateNewSplDetails("selectedImage", null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [setPreviewUrl, solanaClass])

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
				title="Select a Thumbnail"
				colorClass="bg-sky-200 dark:bg-sky-400"
				hoverClass="hover:bg-sky-300 dark:hover:bg-sky-500"
				onClick={() => fileInputRef.current?.click()}
				className="font-semibold"
			/>
		</>
	)
}

export default observer(ChooseThumbnailToUploadButton)
