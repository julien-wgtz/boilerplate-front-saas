class AccountServices {
  static async inviteUser(
    userEmailInvited: string,
    accountId: number
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/invite-user`,
      {
        method: "POST",
        body: JSON.stringify({
          userInvited: userEmailInvited,
          accountId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async acceptInvite(accountId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/accept-invite`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async declineInvite(accountId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/refuse-invite`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async getCurrentAccount() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/current`,
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

  static async leaveAccount(
    accountId: number,
    userId: number
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/leave-invite`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
          userId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async updateRole(
    accountId: number,
    userId: number,
    role: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/update-role`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
          userId,
          role,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async deleteAccount(accountId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/delete`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async createAccount(
    accountName: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/create`,
      {
        method: "POST",
        body: JSON.stringify({
          name: accountName,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async leave(accountId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/leave`,
      {
        method: "POST",
        body: JSON.stringify({
          accountId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  static async changeName(
    newName: string,
    accountId: number
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/change-name`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newName,
          accountId,
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
    blob: Blob,
    fileName: string,
    accountId: number
  ) {
    const formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append(
      "accountId",
      accountId.toString()
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/update-avatar`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    return await response.json();
  }
}

export default AccountServices;
