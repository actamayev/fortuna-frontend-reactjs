import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useRef, ChangeEvent } from "react"
import Button from "../../button"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
}

function ChooseVideoToUploadButton(props: Props) {
	const { previewUrl, setPreviewUrl } = props
	const fileInputRef = useRef<HTMLInputElement>(null)
	const solanaClass = useSolanaContext()

	const handleVideoChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		if (_.isNull(solanaClass)) return
		const files = e.target.files

		if (!_.isNull(files) && !_.isEmpty(files)) {
			const file = files[0]
			const maxFileSize = 150 * 1024 * 1024 // 150 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 150MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}

			solanaClass.updateNewSplDetails("selectedVideo", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			solanaClass.updateNewSplDetails("selectedVideo", null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = "" // Reset the input after handling
	}, [setPreviewUrl, solanaClass])

	if (!_.isNull(previewUrl)) return null

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleVideoChange}
				accept="video/mp4"
				style={{ display: "none" }}
				max={1}
			/>
			<Button
				title="Select a Video"
				colorClass="bg-blue-500 dark:bg-blue-600"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-700"
				onClick={() => fileInputRef.current?.click()}
				className="text-white font-semibold"
			/>
		</>
	)
}

export default observer(ChooseVideoToUploadButton)
