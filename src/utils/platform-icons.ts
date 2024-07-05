import { FaXTwitter } from "react-icons/fa6"
import { FaYoutube, FaInstagram, FaFacebook, FaSpotify } from "react-icons/fa"

const platformIcons = {
	youtube: FaYoutube,
	instagram: FaInstagram,
	facebook: FaFacebook,
	twitter: FaXTwitter,
	spotify: FaSpotify
}

export type SocialPlatformKey = keyof typeof SocialPlatforms

export const SocialPlatforms = {
	youtube: "youtube",
	instagram: "instagram",
	facebook: "facebook",
	twitter: "twitter",
	spotify: "spotify"
}

export default platformIcons
