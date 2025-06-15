import { useState, useCallback } from "react";
import type {
  Producto,
  ProductoFilters,
  ProductoSort,
} from "../types/product.types";

// Datos de ejemplo para el maquetado
const productosMock: Producto[] = [
  {
    id_producto: 1,
    codigo_producto: "LIB001",
    nombre_producto: "El Señor de los Anillos",
    descripcion_corta: "Trilogía completa",
    id_tipo_producto: 1,
    autor: "J.R.R. Tolkien",
    editorial: "Minotauro",
    estado: "ACTIVO",
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString(),
    inventario: {
      id_inventario: 1,
      id_producto: 1,
      sucursal: "PRINCIPAL",
      cant_disponible: 10,
      cant_reservada: 0,
      cant_minima: 5,
      cant_maxima: 100,
      cant_punto_reorden: 10,
      precio_costo_actual: 25.0,
      precio_costo_promedio: 25.0,
      precio_venta_actual: 35.0,
      margen_utilidad: 40,
      estado: "DISPONIBLE",
      fecha_actualizacion: new Date().toISOString(),
    },
  },
  // Agregar más productos de ejemplo aquí
];

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>(productosMock);
  const [filters, setFilters] = useState<ProductoFilters>({});
  const [sort, setSort] = useState<ProductoSort>({
    field: "nombre_producto",
    direction: "asc",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Aquí irá la llamada a la API
      // Por ahora usamos los datos mock
      setProductos(productosMock);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(
    (productos: Producto[], filters: ProductoFilters) => {
      return productos.filter((producto) => {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          if (
            !producto.nombre_producto.toLowerCase().includes(searchLower) &&
            !producto.codigo_producto.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
        }

        if (filters.estado && producto.estado !== filters.estado) {
          return false;
        }

        if (
          filters.id_tipo_producto &&
          producto.id_tipo_producto !== filters.id_tipo_producto
        ) {
          return false;
        }

        const precioVenta = producto.inventario?.precio_venta_actual ?? 0;
        const stockDisponible = producto.inventario?.cant_disponible ?? 0;

        if (filters.precio_min && precioVenta < filters.precio_min) {
          return false;
        }

        if (filters.precio_max && precioVenta > filters.precio_max) {
          return false;
        }

        if (filters.stock_min && stockDisponible < filters.stock_min) {
          return false;
        }

        if (filters.stock_max && stockDisponible > filters.stock_max) {
          return false;
        }

        return true;
      });
    },
    []
  );

  const applySort = useCallback((productos: Producto[], sort: ProductoSort) => {
    return [...productos].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, []);

  const getFilteredAndSortedProductos = useCallback(() => {
    let result = [...productos];
    result = applyFilters(result, filters);
    result = applySort(result, sort);
    return result;
  }, [productos, filters, sort, applyFilters, applySort]);

  const updateFilters = useCallback((newFilters: Partial<ProductoFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const updateSort = useCallback((newSort: ProductoSort) => {
    setSort(newSort);
  }, []);

  return {
    productos: getFilteredAndSortedProductos(),
    loading,
    error,
    filters,
    sort,
    fetchProductos,
    updateFilters,
    updateSort,
  };
};
