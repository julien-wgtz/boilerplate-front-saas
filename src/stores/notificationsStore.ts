import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

type NotificationsState = {
  notifications: any[];
  notificationsNotSeen: number;
  setNotifications: (notifications: any) => void;
  addNotification: (notification: any) => void;
};

const useNotificationsStore = create(
  persist<NotificationsState>(
    (set, get) => ({
      notifications: [],
      notificationsNotSeen: 0,
      setNotifications: (notifications: any) => {
        set({ notifications: notifications });
        const notSeen = notifications.filter(
          (notif: any) => !notif.seen
        ).length;

        set({
          notificationsNotSeen: notSeen,
        });
      },
      addNotification: (notification: any) => {
        set({
          notifications: [
            notification,
            ...get().notifications,
          ],
        });
        set({
          notificationsNotSeen:
            get().notificationsNotSeen + 1,
        });
      },
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(
        () => localStorage
      ),
    }
  )
);

export default useNotificationsStore;
