import { Navigate, Route, Routes } from "react-router";
import { LoginPages } from "../pages/LoginPages";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPages />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
