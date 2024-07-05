import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class NotificationsClass {
	public notification: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	public setNotification = action((newNotification: string): void => {
		this.notification = newNotification
	})

	public setNotificationNull = action((): void =>  {
		this.notification = null
	})

	public logout() {
		this.notification = null
	}
}

const NotificationsContext = createContext(new NotificationsClass())

export default function NotificationsProvider ({ children }: { children: React.ReactNode }) {
	const notificationsClass = useMemo(() => new NotificationsClass(), [])

	return (
		<NotificationsContext.Provider value={notificationsClass}>
			{children}
		</NotificationsContext.Provider>
	)
}

export const useNotificationsContext = () => useContext(NotificationsContext)
