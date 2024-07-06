import { AccountContext } from "@context/account";
import { useContext } from "react";
import { useBackend } from "./useBackend";

export const useAuth = () => {
  const { setAccount } = useContext(AccountContext);
  const { auth, account: accountService } = useBackend();

  const login = async (email: string, password: string) => {
    const token = await auth.login(email, password);

    setToken(token);

    return whoami();
  };

  const register = async (name: string, email: string, password: string) => {
    const token = await auth.register(name, email, password);

    setToken(token);

    return whoami();
  };

  const setToken = (token?: string) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  const whoami = async () => {
    const token = localStorage.getItem("token");

    // console.log({ token });

    if (!token) return;

    const me = await accountService.whoami(token);

    if (!me) return;

    setAccount({
      ...me,
      token,
    });

    return me;
  };

  const logout = async () => {
    localStorage.removeItem("token");

    setAccount(undefined);
  };

  return {
    login,
    register,
    whoami,
    logout,
  };
};
