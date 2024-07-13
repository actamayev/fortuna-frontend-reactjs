import { useCallback } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import SolOrUsdSlider from "../../sliders/sol-or-usd-slider"
import HoverOutlineComponent from "../../hover-outline-component"

interface Props {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export default function WalletSummaryHeader(props: Props) {
	const { isOpen, setIsOpen } = props

	const toggleContent = useCallback(() => {
		setIsOpen(prevState => !prevState)
	}, [setIsOpen])

	return (
		<div className="border-b">
			<div className="flex justify-between items-center mb-2">
				<div className="text-lg font-semibold">
					Wallet
				</div>
				<div className="flex items-center">
					<SolOrUsdSlider />
					<HoverOutlineComponent
						onClickAction={toggleContent}
						classes="relative flex items-center justify-center text-black dark:text-white ml-0.5"
					>
						{isOpen ? (
							<IoIosArrowUp size={20}/>
						) : (
							<IoIosArrowDown size={20}/>
						)}
					</HoverOutlineComponent>
				</div>
			</div>
		</div>
	)
}
