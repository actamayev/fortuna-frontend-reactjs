// eslint-disable-next-line complexity
export default function convertSocialLinkToProperCasing(socialLink: SocialPlatformKey): string {
	try {
		if (socialLink === "applemusic") return "Apple Music"
		else if (socialLink === "facebook") return "Facebook"
		else if (socialLink === "instagram") return "Instagram"
		else if (socialLink === "soundcloud") return "SoundCloud"
		else if (socialLink === "spotify") return "Spotify"
		else if (socialLink === "tiktok") return "TikTok"
		else if (socialLink === "twitch") return "Twitch"
		else if (socialLink === "twitter") return "X/Twitter"
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		else if (socialLink === "youtube") return "YouTube"
		return ""
	} catch (error) {
		console.error(error)
		return ""
	}
}
