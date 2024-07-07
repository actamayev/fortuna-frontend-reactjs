import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"
import { useCreatorContext } from "../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentChannelBannerPicture(props: Props) {
	const { handleImageChange, fileInputRef, handleMouseEnter, handleMouseLeave, imageStyle, editPictureCallback } = props
	const creatorClass = useCreatorContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	const channelBannerPictureUrl = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.channelBannerUrl || ""
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.channelBannerUrl])

	return (
		<div className="relative inline-block">
			{channelBannerPictureUrl ? (
				<img
					src={channelBannerPictureUrl}
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

export default observer(ShowCurrentChannelBannerPicture)
