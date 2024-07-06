import type { UserWithoutPassword } from "@types";
import { createContext, useState } from "react";

export const AccountContext = createContext<{
  account?: UserWithoutPassword | null;
  setAccount: (account?: UserWithoutPassword) => void;
}>({
  account: null,
  setAccount(account?: UserWithoutPassword) {
    this.account = account;
  },
});

export const AccountProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [account, setAccount] = useState<UserWithoutPassword | null>();

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
