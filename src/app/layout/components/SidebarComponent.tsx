import { useState } from "react";
import {
  Home,
  Package,
  Users,
  Truck,
  ShoppingCart,
  ShoppingBag,
  Archive,
  UserCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "products", icon: Package, label: "Productos" },
  { id: "clients", icon: Users, label: "Clientes" },
  { id: "suppliers", icon: Truck, label: "Proveedores" },
  { id: "sales", icon: ShoppingCart, label: "Ventas" },
  { id: "purchases", icon: ShoppingBag, label: "Compras" },
  { id: "inventory", icon: Archive, label: "Inventario" },
  { id: "employees", icon: UserCheck, label: "Empleados" },
  { id: "reports", icon: BarChart3, label: "Reportes" },
  { id: "settings", icon: Settings, label: "Configuración" },
];

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-slate-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold">Librería</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
