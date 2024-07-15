// import { observer } from "mobx-react"
// import PageHelmet from "../components/page-helmet"
// import ShowEmail from "../components/profile/show-email"
// import { useAuthContext } from "../contexts/auth-context"
// import SectionHeader from "../components/headers/section-header"
// import ShowAuthToNullUser from "../components/show-auth-to-null-user"


// function Profile() {
// 	const authClass = useAuthContext()

// 	if (authClass.isLoggedIn === false) {
// 		return (
// 			<>
// 				<PageHelmet pageTitle="/profile" />
// 				<ShowAuthToNullUser whereToNavigate="/profile" />
// 			</>
// 		)
// 	}

// 	return (
// 		<>
// 			<PageHelmet pageTitle="/profile" />
// 			<SectionHeader siteTitle="Profile" />
// 			<ShowEmail />
// 		</>
// 	)
// }

// export default observer(Profile)
