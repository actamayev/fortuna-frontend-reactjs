import _ from "lodash"
import { observer } from "mobx-react"
import { PiVideoFill } from "react-icons/pi"
import { useCallback, useRef, ChangeEvent } from "react"
import Button from "../../buttons/button"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	previewUrl: string | null
	setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
}

function ChooseVideoToUploadButton(props: Props) {
	const { previewUrl, setPreviewUrl } = props
	const fileInputRef = useRef<HTMLInputElement>(null)
	const creatorClass = useCreatorContext()

	const handleVideoChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		if (_.isNull(creatorClass)) return
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

			creatorClass.updateNewVideoDetails("selectedVideo", file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		} else {
			creatorClass.updateNewVideoDetails("selectedVideo", null)
			setPreviewUrl(null)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = "" // Reset the input after handling
	}, [setPreviewUrl, creatorClass])

	const onClickButtonCallback = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

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
				title="Upload Video"
				titleIcon={<PiVideoFill size={20}/>}
				colorClass="bg-blue-500 dark:bg-blue-400"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
				onClick={onClickButtonCallback}
				className="text-zinc-50 dark:text-zinc-950 font-semibold"
			/>
		</>
	)
}

export default observer(ChooseVideoToUploadButton)
