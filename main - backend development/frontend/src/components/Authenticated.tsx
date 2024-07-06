import { Navigate } from "react-router";
import { useAccount } from "../hooks/useAccount";

const Authenticated = <T extends object>(Component: React.ComponentType<T>) => {
  const WrapperComponent: React.FC<T> = (props) => {
    const { account } = useAccount();

    // console.log(1, { account });

    if (!account) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return WrapperComponent;
};

export default Authenticated;
