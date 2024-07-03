import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

interface Props {
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentProfilePicture(props: Props) {
	const { handleImageChange, fileInputRef, handleMouseEnter, handleMouseLeave, imageStyle } = props
	const personalInfoClass = usePersonalInfoContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	const editPictureCallback = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

	if (_.isNull(personalInfoClass)) return null

	return (
		<div className="relative inline-block my-3">
			{personalInfoClass.profilePictureUrl ? (
				<img
					src={personalInfoClass.profilePictureUrl || ""}
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			) : (
				<FaUserCircle
					className="w-36 h-36 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					color={defaultSiteTheme === "dark" ? "white" : "black" }
				/>
			)}
			<div
				className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600 p-1 rounded-full \
					cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<RiPencilFill
					color="white"
					size={22}
					onClick={editPictureCallback}
				/>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/jpeg, image/png"
				style={{ display: "none" }}
				max={1}
			/>
		</div>
	)
}

export default observer(ShowCurrentProfilePicture)
