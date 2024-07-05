import platformIcons from "../../../utils/platform-icons"

interface Props {
	platform: SocialPlatformKey
}

export default function SingleActivePlatformLink(props: Props) {
	const { platform } = props

	const IconComponent = platformIcons[platform]

	return (
		<div className="flex items-center mr-3">
			<IconComponent size={24} />
		</div>
	)
}
