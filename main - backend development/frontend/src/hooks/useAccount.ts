import { AccountContext } from "@context/account";
import { useContext } from "react";

export const useAccount = () => {
  const { account, setAccount } = useContext(AccountContext);

  return {
    account,
    setAccount,
  };
};
