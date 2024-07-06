import Authenticated from "@components/Authenticated";
import { useAccount } from "@hooks/useAccount";

const AccountPage = Authenticated(() => {
  const { account } = useAccount();

  if (!account) {
    return <></>;
  }

  return (
    <div className="p-8 rounded-md shadow-md bg-slate-100">
      <div className="text-xl font-bold">Hello, {account.name}</div>
      <div>Email: {account.email}</div>
      <div>Role: {account.role}</div>
    </div>
  );
});

export default AccountPage;
