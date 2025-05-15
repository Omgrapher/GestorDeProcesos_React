import { Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      //todo: add the rest of the routes
      {/* <Route path="/*" element={<GestorRoutes />} /> */}
    </Routes>
  );
};
