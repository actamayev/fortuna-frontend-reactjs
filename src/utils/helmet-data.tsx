import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

const helmetData: HelmetData = {
	"/": (
		<BasicHelmet pageTitleData="Fortuna | Exclusive Videos" />
	),
	"/login": (
		<BasicHelmet pageTitleData="Login | Forutuna" />
	),
	"/register": (
		<BasicHelmet pageTitleData="Register | Fortuna" />
	),
	"/register-username": (
		<BasicHelmet pageTitleData="Register Username | Fortuna" />
	),
	"/ownership": (
		<BasicHelmet pageTitleData="Ownership | Fortuna" />
	),
	"/wallet": (
		<BasicHelmet pageTitleData="Wallet | Fortuna" />
	),
	"/creator/studio": (
		<BasicHelmet pageTitleData="Creator Studio | Fortuna" />
	),
	"/creator/create-content": (
		<BasicHelmet pageTitleData="Create Content | Fortuna" />
	),
	"/contact": (
		<BasicHelmet pageTitleData="Contact Us | Fortuna" />
	)
}

export default helmetData
