import { create } from 'zustand';

import { uid } from '@/lib/uid';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';
export type Notification = {
  id: string;
  type: NotificationType;
  title?: string;
  duration?: number;
  message?: string;
};
type NotificationsStore = {
  notifications: Notification[];
  actions: {
    showNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
  };
};
const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  actions: {
    showNotification: (notification) => {
      const id = uid(); // generate a unique id for the notification
      const duration = notification.duration ?? 5000; // 5 seconds
      set((state) => ({
        // add the notification to the state (notifications array)
        notifications: [
          ...state.notifications,
          { id, duration, ...notification },
        ],
      }));
      if (duration > 0) {
        // if the duration is greater than 0, set a timeout to dismiss the notification
        setTimeout(() => {
          get().actions.dismissNotification(id);
        }, duration);
      }
    },
    // açao para dismissar a notificação
    dismissNotification: (id) => {
      // remove the notification from the state (notifications array)
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  },
}));
// hook to get the notifications
export const useNotifications = () =>
  useNotificationsStore((state) => state.notifications);

// hook to get the notification actions
export const useNotificationActions = () =>
  useNotificationsStore((state) => state.actions);
