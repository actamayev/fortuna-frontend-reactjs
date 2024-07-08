import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { FaSave, FaTimesCircle, FaTrash, FaUserCircle } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"
import useRemoveCurrentProfilePicture from "../../../../hooks/creator/remove-current-profile-picture"

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
	const creatorClass = useCreatorContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const removeCurrentProfilePicture = useRemoveCurrentProfilePicture()
	const [isDeletingCurrentPicture, setIsDeletingCurrentPicture] = useState(false)

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			{(creatorClass?.profilePictureUrl && isDeletingCurrentPicture === false) ? (
				<>
					<img
						src={creatorClass.profilePictureUrl}
						className="w-32 h-32 rounded-full object-cover cursor-pointer"
						style={imageStyle}
						onClick={editPictureCallback}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
					<div
						className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
							cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
					>
						<FaTrash
							color="white"
							size={22}
							onClick={() => setIsDeletingCurrentPicture(true)}
						/>
					</div>
				</>
			) : (
				<>
					<FaUserCircle
						className="w-32 h-32 rounded-full object-cover cursor-pointer"
						style={imageStyle}
						onClick={editPictureCallback}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						color={defaultSiteTheme === "dark" ? "white" : "black"}
					/>
					{!_.isNil(creatorClass?.profilePictureUrl) && (
						<>
							<div
								className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
									cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
							>
								<FaTimesCircle
									color="white"
									size={22}
									onClick={() => setIsDeletingCurrentPicture(false)}
								/>
							</div>
							<div
								className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
									cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
							>
								<FaSave
									color="white"
									size={22}
									onClick={() => removeCurrentProfilePicture(setIsDeletingCurrentPicture)}
								/>
							</div>
						</>
					)}
				</>
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
