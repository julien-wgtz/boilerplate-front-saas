class UserService {
  static async signup(credentials: {
    password: string;
    email: string;
    name: string;
    lang: string;
  }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async login(credentials: {
    password: string;
    email: string;
  }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async logout() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    return await response.json();
  }

  static async askChangeEmail(email: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/ask-change-email`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async updateEmail(token: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-email`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async me(cookie?: any) {
    let response;
    if (!cookie) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `connect.sid=${cookie.value}`, // Format correct du cookie
          },
        }
      );
    }

    const data = await response.json();
    return data;
  }

  static async resetPassword(email: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset-password`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async changePasswordToken(
    password: string,
    token: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-password-token`,
      {
        method: "POST",
        body: JSON.stringify({ password, token }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async changePassword(
    lastPassword: string,
    password: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-password`,
      {
        method: "POST",
        body: JSON.stringify({
          password,
          lastPassword,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async changeTheme(theme: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-theme`,
      {
        method: "POST",
        body: JSON.stringify({ theme }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async accounts() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/accounts`,
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

  static async deleteUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/delete-user`,
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

  static async changeCurrentAccount(
    accountId: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-current-account`,
      {
        method: "POST",
        body: JSON.stringify({ accountId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async changeUserName(newName: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/change-name`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newName,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async updateAvatar(
    avatar: Blob,
    fileName: string
  ) {
    const formData = new FormData();
    formData.append("file", avatar, fileName);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/update-avatar`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    return await response.json();
  }
}

export default UserService;
