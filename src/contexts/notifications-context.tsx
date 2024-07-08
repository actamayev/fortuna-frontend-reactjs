import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class NotificationsClass {
	public notification: string | null = null
	private timer: NodeJS.Timeout | null = null

	constructor() {
		makeAutoObservable(this)
	}

	public setNotification = action((newNotification: string): void => {
		this.notification = newNotification
		this.resetTimer()
	})

	private setNotificationNull = action((): void => {
		this.notification = null
		this.clearTimer()
	})

	private resetTimer() {
		this.clearTimer()
		this.timer = setTimeout(() => {
			this.setNotificationNull()
		}, 3000)
	}

	private clearTimer() {
		if (_.isNull(this.timer)) return
		clearTimeout(this.timer)
		this.timer = null
	}

	public logout() {
		this.notification = null
		this.clearTimer()
	}
}

const NotificationsContext = createContext(new NotificationsClass())

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
	const notificationsClass = useMemo(() => new NotificationsClass(), [])

	return (
		<NotificationsContext.Provider value={notificationsClass}>
			{children}
		</NotificationsContext.Provider>
	)
}

export const useNotificationsContext = () => useContext(NotificationsContext)
