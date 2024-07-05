import { FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "../../hover-outline-component"

interface Props {
    toggleEditMode: () => void
}

export default function SocialLinksModal(props: Props) {
	const { toggleEditMode } = props

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/4">
				<div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-700">
					<h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-50">
                        Social Links
					</h2>
					<HoverOutlineComponent
						classes="relative flex items-center justify-center inline-block"
						onClickAction={toggleEditMode}
					>
						<FaTimes />
					</HoverOutlineComponent>
				</div>
				<div className="p-4">
					Modal content hre
					{/* Modal content goes here */}
				</div>
			</div>
		</div>
	)
}
