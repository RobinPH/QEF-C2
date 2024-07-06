import { UserRole } from "@types";
import { Navigate } from "react-router";
import { useAccount } from "../hooks/useAccount";
import Authenticated from "./Authenticated";

const WithRole = <T extends object>(
  Component: React.ComponentType<T>,
  roles: UserRole[]
) => {
  const WrapperComponent: React.FC<T> = (props) => {
    const { account } = useAccount();

    if (!account || !roles.includes(account.role)) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return Authenticated(WrapperComponent);
};

export default WithRole;
