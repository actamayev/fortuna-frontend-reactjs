import _ from "lodash"
import { FaUserCircle } from "react-icons/fa"

interface Props {
	profileImageUrl: string | null | undefined
	onClickCreatorPicture?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
	onClickDefaultPicture?: () => void
	extraClasses: string
}

export default function ShowUserProfileImageOrDefaultImage(props: Props) {
	const { profileImageUrl, onClickCreatorPicture, onClickDefaultPicture, extraClasses } = props

	if (_.isNil(profileImageUrl)) {
		return (
			<FaUserCircle
				className={`text-black dark:text-white ${extraClasses}`}
				onClick={onClickDefaultPicture}
			/>
		)
	}

	return (
		<img
			src={profileImageUrl}
			alt="Creator's Profile"
			className={extraClasses}
			onClick={onClickCreatorPicture}
		/>
	)
}
