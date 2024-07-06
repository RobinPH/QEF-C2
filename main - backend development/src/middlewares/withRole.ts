import { UserRole } from "@prisma/client";
import { createErrorResponse } from "@utils/index";
import { isAuthenticatedMiddleware } from "./isAuthenticated";

// const withRole = combine(isAuthenticated(), (...roles: UserRole[]) => {
//   return async (req, res, next) => {
//     const { user } = res.locals;

//     if (!roles.includes(user.role)) {
//       return res.status(400).send(createErrorResponse("Unauthorized role"));
//     }

//     res.locals.role = user.role;

//     next();
//   };
// });

export const withRoleMiddleware = <Roles extends UserRole[]>(
  ...roles: Roles
) => {
  return isAuthenticatedMiddleware().addWithLocals<{
    role: Roles[number];
  }>(async (req, res, next) => {
    const { user } = res.locals;

    if (!roles.includes(user.role)) {
      return res.status(400).send(createErrorResponse("Unauthorized role"));
    }

    res.locals.role = user.role;

    next();
  });
};

const withRole = <Roles extends UserRole[]>(...roles: Roles) => {
  return withRoleMiddleware(...roles).build();
};

export default withRole;
