"use client";
import useUserStore from "@/stores/userStore";
import { hasRole } from "@/utils/roleChecker";
import React from "react";

const Page: React.FC = () => {
  const { roleCurrentAccount } = useUserStore();

  if (
    !hasRole(
      [roleCurrentAccount],
      ["ADMIN", "OWNER"]
    )
  ) {
    return (
      <div>
        <h1>Accès refusé</h1>
        <p>
          Vous n'avez pas les autorisations
          nécessaires pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Billing</h1>
      <p>This is a basic page component.</p>
    </div>
  );
};

export default Page;
