import { createContext, useMemo } from "react";
import { useAccount } from "../hooks/useAccount";
import { Backend } from "../utils/backend/Backend";

export const BackendContext = createContext<Backend>(new Backend());

export const BackendProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { account } = useAccount();
  const backend = useMemo(() => new Backend(account), [account]);

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};
