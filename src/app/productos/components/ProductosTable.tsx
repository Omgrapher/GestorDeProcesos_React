import { useState } from "react";
import type { Producto, ProductoSort } from "../types/product.types";
import { useProductos } from "../hooks/useProductos";

interface ProductosTableProps {
  onEdit?: (producto: Producto) => void;
  onDelete?: (producto: Producto) => void;
}

export const ProductosTable = ({ onEdit, onDelete }: ProductosTableProps) => {
  const { productos, loading, error, sort, updateSort } = useProductos();
  const [selectedProductos, setSelectedProductos] = useState<Set<number>>(
    new Set()
  );

  const handleSort = (field: keyof Producto) => {
    updateSort({
      field,
      direction:
        sort.field === field && sort.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductos(new Set(productos.map((p) => p.id_producto)));
    } else {
      setSelectedProductos(new Set());
    }
  };

  const handleSelectProducto = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedProductos);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedProductos(newSelected);
  };

  if (loading) {
    return <div className="text-center p-4">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedProductos.size === productos.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("codigo_producto")}
            >
              Código
              {sort.field === "codigo_producto" && (
                <span className="ml-1">
                  {sort.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("nombre_producto")}
            >
              Nombre
              {sort.field === "nombre_producto" && (
                <span className="ml-1">
                  {sort.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tipo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Precio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto) => (
            <tr key={producto.id_producto} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedProductos.has(producto.id_producto)}
                  onChange={(e) =>
                    handleSelectProducto(producto.id_producto, e.target.checked)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {producto.codigo_producto}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {producto.nombre_producto}
                </div>
                {producto.descripcion_corta && (
                  <div className="text-sm text-gray-500">
                    {producto.descripcion_corta}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {producto.tipo_producto?.nombre || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  {(() => {
                    const stock = producto.inventario?.cant_disponible ?? 0;
                    const stockMin = producto.inventario?.cant_minima ?? 0;
                    const stockClass =
                      stock === 0
                        ? "bg-red-100 text-red-800"
                        : stock <= stockMin
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800";

                    return (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockClass}`}
                      >
                        {stock}
                      </span>
                    );
                  })()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Q{" "}
                {producto.inventario?.precio_venta_actual.toFixed(2) || "0.00"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    producto.estado === "ACTIVO"
                      ? "bg-green-100 text-green-800"
                      : producto.estado === "INACTIVO"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {producto.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit?.(producto)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete?.(producto)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
