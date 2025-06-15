import { useState, useEffect } from "react";
import type { ProductoFilters } from "../types/product.types";
import { Search, RefreshCw } from "lucide-react";

interface ProductosFiltersProps {
  onFilterChange: (filters: ProductoFilters) => void;
  onRefresh: () => void;
}

export const ProductosFilters = ({
  onFilterChange,
  onRefresh,
}: ProductosFiltersProps) => {
  const [filters, setFilters] = useState<ProductoFilters>({
    search: "",
    estado: undefined,
    precio_min: undefined,
    precio_max: undefined,
    stock_min: undefined,
    stock_max: undefined,
  });

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    onFilterChange(filters);
    // Simulamos un pequeño delay para mostrar el estado de búsqueda
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Barra de búsqueda con botón */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Buscar
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={filters.search}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Buscar por código o nombre..."
                  className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <Search
                      className={`h-5 w-5 ${
                        isSearching ? "animate-pulse" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={onRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <select
            name="estado"
            id="estado"
            value={filters.estado || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
            <option value="DESCONTINUADO">Descontinuado</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="precio_min"
              className="block text-sm font-medium text-gray-700"
            >
              Precio Mín
            </label>
            <input
              type="number"
              name="precio_min"
              id="precio_min"
              value={filters.precio_min || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="precio_max"
              className="block text-sm font-medium text-gray-700"
            >
              Precio Máx
            </label>
            <input
              type="number"
              name="precio_max"
              id="precio_max"
              value={filters.precio_max || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="stock_min"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Mín
            </label>
            <input
              type="number"
              name="stock_min"
              id="stock_min"
              value={filters.stock_min || ""}
              onChange={handleChange}
              min="0"
              placeholder="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="stock_max"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Máx
            </label>
            <input
              type="number"
              name="stock_max"
              id="stock_max"
              value={filters.stock_max || ""}
              onChange={handleChange}
              min="0"
              placeholder="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
