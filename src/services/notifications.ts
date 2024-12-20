class NotificationsService {
  static async getNotificationsFromUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/notifications/get-notification-user`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  }

  static async markAsSeen(
    notificationId: string
  ) {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/notifications/seen-notification`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId,
        }),
      }
    );
  }

  static async markAsRead(
    notificationId: string
  ) {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/notifications/read-notification`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId,
        }),
      }
    );
  }
}

export default NotificationsService;
