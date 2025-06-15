import { useState, useCallback } from "react";
import { ProductosTable } from "../components/ProductosTable";
import { ProductosFilters } from "../components/ProductosFilters";
import type { Producto, ProductoFilters } from "../types/product.types";
import { useProductos } from "../hooks/useProductos";
import { Plus } from "lucide-react";

export const ProductsPage = () => {
  const { updateFilters, fetchProductos } = useProductos();
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (filters: ProductoFilters) => {
    updateFilters(filters);
  };

  const handleRefresh = useCallback(() => {
    fetchProductos();
  }, [fetchProductos]);

  const handleEdit = (producto: Producto) => {
    setSelectedProducto(producto);
    setIsModalOpen(true);
  };

  const handleDelete = (producto: Producto) => {
    // Aquí se mostraría el diálogo de confirmación
    console.log("Eliminar producto:", producto);
  };

  const handleAddNew = () => {
    setSelectedProducto(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProducto(null);
  };

  const handleSaveProducto = (producto: Producto) => {
    // Aquí iría la lógica para guardar el producto
    console.log("Guardar producto:", producto);
    handleCloseModal();
    handleRefresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Productos
        </h1>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
        </button>
      </div>

      <ProductosFilters
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProductosTable onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Modal de Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedProducto ? "Editar Producto" : "Nuevo Producto"}
              </h2>
            </div>
            <div className="px-6 py-4">
              {/* Aquí iría el formulario de producto */}
              <p className="text-gray-500">
                Formulario de producto en desarrollo...
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  selectedProducto && handleSaveProducto(selectedProducto)
                }
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
