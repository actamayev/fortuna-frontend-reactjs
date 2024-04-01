import HeaderItem from "./header-item"

export default function SupporterHeader() {
	return (
		<div className = "flex space-x-4 p-4">
			<HeaderItem label = "My Owernship" to = "/my-ownership" />
			<HeaderItem label = "Wallet Details" to = "/my-wallet" />
		</div>
	)
}
