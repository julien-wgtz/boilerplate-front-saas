export const hasRole = (
  userRoles: string[],
  roles: string[]
) => {
  return roles.some((role) =>
    userRoles.includes(role)
  );
};
