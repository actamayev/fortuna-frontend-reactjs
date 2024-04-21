import HeaderItem from "./header-item"

export default function CreatorHeader() {
	return (
		<div className = "flex space-x-4 pb-4">
			<HeaderItem label = "My Content" to = "/creator/my-content" />
			<HeaderItem label = "My Wallet" to = "/creator/my-wallet" />
			<HeaderItem label = "+" to = "/creator/upload-content" />
		</div>
	)
}
