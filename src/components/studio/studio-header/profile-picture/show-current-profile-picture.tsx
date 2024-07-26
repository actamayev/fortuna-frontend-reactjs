import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaSave, FaTimesCircle, FaTrash, FaUserCircle } from "react-icons/fa"
import { useCreatorContext } from "../../../../contexts/creator-context"
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
	const removeCurrentProfilePicture = useRemoveCurrentProfilePicture()
	const [isDeletingCurrentPicture, setIsDeletingCurrentPicture] = useState(false)

	const toggleIsDeletingPicture = useCallback(() => {
		setIsDeletingCurrentPicture(prevState => !prevState)
	}, [])

	const removeCurrentProfilePictureCallback = useCallback(async() => {
		await removeCurrentProfilePicture(setIsDeletingCurrentPicture)
	}, [removeCurrentProfilePicture])

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			{(creatorClass.profilePictureUrl && isDeletingCurrentPicture === false) ? (
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
						onClick={toggleIsDeletingPicture}

					>
						<FaTrash color="white" size={22} />
					</div>
				</>
			) : (
				<>
					<div className="text-black dark:text-white">
						<FaUserCircle
							className="w-32 h-32 rounded-full object-cover cursor-pointer"
							style={imageStyle}
							onClick={editPictureCallback}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					</div>
					{!_.isNull(creatorClass.profilePictureUrl) && (
						<>
							<div
								className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
									cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
								onClick={toggleIsDeletingPicture}

							>
								<FaTimesCircle color="white" size={22} />
							</div>
							<div
								className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
									cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
								onClick={removeCurrentProfilePictureCallback}

							>
								<FaSave color="white" size={22} />
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
