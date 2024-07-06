import { useStudent } from "@hooks";
import { Navigate } from "react-router";
import Authenticated from "./Authenticated";

const IsStudent = <T extends object>(Component: React.ComponentType<T>) => {
  const WrapperComponent: React.FC<T> = (props) => {
    const { isLoading, student } = useStudent();

    if (isLoading) {
      return <></>;
    }

    if (!student) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return Authenticated(WrapperComponent);
};

export default IsStudent;
