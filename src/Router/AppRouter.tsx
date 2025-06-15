import { Route, Routes, Navigate } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { PrivateRoute } from "../auth/components/PrivateRoute";
import { ProductsPage } from "../app/productos/pages/ProductsPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/clients" element={<div>Clientes</div>} />
        <Route path="/suppliers" element={<div>Proveedores</div>} />
        <Route path="/sales" element={<div>Ventas</div>} />
        <Route path="/purchases" element={<div>Compras</div>} />
        <Route path="/inventory" element={<div>Inventario</div>} />
        <Route path="/employees" element={<div>Empleados</div>} />
        <Route path="/reports" element={<div>Reportes</div>} />
        <Route path="/settings" element={<div>Configuración</div>} />
      </Route>

      {/* Ruta por defecto */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
