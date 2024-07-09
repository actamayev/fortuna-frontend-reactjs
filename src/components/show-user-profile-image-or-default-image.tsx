import _ from "lodash"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

interface Props {
	profileImageUrl: string | null | undefined
	onClickCreatorPicture?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
	onClickDefaultPicture?: () => void
	extraClasses: string
}

function ShowUserProfileImageOrDefaultImage(props: Props) {
	const { profileImageUrl, onClickCreatorPicture, onClickDefaultPicture, extraClasses } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	if (_.isNil(profileImageUrl)) {
		return (
			<FaUserCircle
				color={defaultSiteTheme === "dark" ? "white" : "black"}
				className={extraClasses}
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

export default observer(ShowUserProfileImageOrDefaultImage)
