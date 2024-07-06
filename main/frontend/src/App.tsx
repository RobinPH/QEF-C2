import NavigationBar from "@components/NavigationBar";
import { useAuth } from "@hooks";
import AccountPage from "@pages/Account";
import AnalystPage from "@pages/Analyst";
import LoginPage from "@pages/Login";
import RegisterPage from "@pages/Register";
import StudentPage from "@pages/Student";
import TeacherPage from "@pages/Teacher";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

export default function App() {
  const { whoami } = useAuth();

  useEffect(() => {
    whoami();
  }, []);

  // whoami();

  return (
    <div data-theme="light">
      <NavigationBar />
      <div className="px-8 py-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/analyst" element={<AnalystPage />} />
        </Routes>
      </div>
    </div>
  );
}
