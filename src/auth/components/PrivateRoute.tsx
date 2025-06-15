import { Navigate, Outlet } from "react-router";
import { Sidebar } from "../../app/layout/components/SidebarComponent";

export const PrivateRoute = () => {
  // Por ahora, siempre retornamos true para simular que el usuario está autenticado
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar currentPage="dashboard" onPageChange={() => {}} />
      <main className="flex-1 p-8 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};
