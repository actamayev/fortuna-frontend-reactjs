/* eslint-disable max-len */
import TradeSectionModal from "./trade-section-modal"
import SecondarySharesOrderBook from "./secondary-shares-order-book"
import SecondarySharesVideoSection from "./secondary-shares-video-section"

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SecondarySharesModal(props: Props) {
	const { setIsOpen } = props

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="relative bg-white p-5 w-3/4 grid grid-cols-4 gap-4 shadow-lg rounded-lg">
				<button
					onClick={() => setIsOpen(false)}
					className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
				>
					&times;
				</button>

				<TradeSectionModal />
				<SecondarySharesVideoSection />

				<SecondarySharesOrderBook />
			</div>
		</div>
	)
}
