import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

const helmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="Fortuna | Exclusive Videos"
			description="Fortuna empowers video creators sell access to exclusive content directly to their fans"
			url="https://www.createfortuna.com"
			needsFortunaSuffix={false}
		/>
	),
	"/login": (
		<BasicHelmet
			pageTitleData="Login"
			description="Login to your Fortuna account to access exclusive content."
			url="https://www.createfortuna.com/login"
		/>
	),
	"/register": (
		<BasicHelmet
			pageTitleData="Register"
			description="Create an account on Fortuna to start accessing exclusive video content."
			url="https://www.createfortuna.com/register"
		/>
	),
	"/register-username": (
		<BasicHelmet
			pageTitleData="Register Username"
			description="Choose a username for your Fortuna account."
			url="https://www.createfortuna.com/register-username"
		/>
	),
	"/ownership": (
		<BasicHelmet
			pageTitleData="Ownership"
			description="Access your content ownership on Fortuna."
			url="https://www.createfortuna.com/ownership"
		/>
	),
	"/wallet": (
		<BasicHelmet
			pageTitleData="Wallet"
			description="Manage your wallet and transactions on Fortuna."
			url="https://www.createfortuna.com/wallet"
		/>
	),
	"/creator/studio": (
		<BasicHelmet
			pageTitleData="Creator Studio"
			description="Access the Creator Studio to manage your content on Fortuna."
			url="https://www.createfortuna.com/creator/studio"
		/>
	),
	"/creator/create-content": (
		<BasicHelmet
			pageTitleData="Create Content"
			description="Create and upload new content to Fortuna."
			url="https://www.createfortuna.com/creator/create-content"
		/>
	),
	"/contact": (
		<BasicHelmet
			pageTitleData="Contact Us"
			description="Get in touch with the Fortuna team."
			url="https://www.createfortuna.com/contact"
		/>
	)
}

export default helmetData
