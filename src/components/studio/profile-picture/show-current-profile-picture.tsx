import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentProfilePicture(props: Props) {
	const { handleImageChange, fileInputRef, handleMouseEnter, handleMouseLeave, imageStyle, editPictureCallback } = props
	const personalInfoClass = usePersonalInfoContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	const profilePictureUrl = useMemo(() => {
		if (_.isNull(personalInfoClass)) return ""
		return personalInfoClass.profilePictureUrl || ""
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.profilePictureUrl])

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			{profilePictureUrl ? (
				<img
					src={profilePictureUrl}
					className="w-32 h-32 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			) : (
				<FaUserCircle
					className="w-32 h-32 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={editPictureCallback}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					color={defaultSiteTheme === "dark" ? "white" : "black"}
				/>
			)}
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
