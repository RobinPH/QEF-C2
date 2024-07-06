import { useAccount, useAuth } from "@hooks";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { account } = useAccount();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost">LMS</a>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          {account && (
            <>
              {account?.role === "STUDENT" && (
                <li>
                  <Link to="/student">Student Dashboard</Link>
                </li>
              )}
              {account?.role === "TEACHER" && (
                <li>
                  <Link to="/teacher">Teacher Dashboard</Link>
                </li>
              )}
              {account?.role === "ANALYST" && (
                <li>
                  <Link to="/analyst">Analyst Dashboard</Link>
                </li>
              )}
            </>
          )}
          {account ? (
            <li>
              <details>
                <summary>{account.email}</summary>
                <ul className="p-2 rounded-t-none bg-base-100">
                  <li>
                    <Link to="/account">View Profile</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
