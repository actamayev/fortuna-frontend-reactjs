import HeaderItem from "./header-item"

export default function SupporterHeader() {
	return (
		<div className = "flex space-x-4 p-4">
			<HeaderItem label = "My Ownership" to = "/my-ownership" />
			<HeaderItem label = "My Wallet" to = "/my-wallet" />
		</div>
	)
}
