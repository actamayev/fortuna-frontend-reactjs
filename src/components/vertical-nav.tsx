import { VerticalNavLink } from "./custom-link"

export default function VerticalNavBar() {
	return (
		<nav className="flex flex-col h-full justify-center mt-2 ml-2">
			<ul className="space-y-2">
				<VerticalNavLink href = "/events-dashboard" title = "Events Dashboard"/>
				<VerticalNavLink href = "/users-dashboard" title = "Users Dashboard"/>
				<VerticalNavLink href = "/event-categories-dashboard" title = "Event Categories"/>
				<VerticalNavLink href = "/event-types-dashboard" title = "Event Types"/>
				<VerticalNavLink href = "/add-admin" title = "Add Admin"/>
			</ul>
		</nav>
	)
}
