export type Estado = "ACTIVO" | "INACTIVO" | "DESCONTINUADO";

export interface Producto {
  id_producto: number;
  codigo_producto: string;
  nombre_producto: string;
  descripcion_corta?: string;
  descripcion_completa?: string;
  id_tipo_producto: number;
  autor?: string;
  editorial?: string;
  peso?: number;
  dimensiones?: string;
  idioma?: string;
  imagen_url?: string;
  estado: Estado;
  fecha_creacion: string;
  fecha_actualizacion: string;
  id_empleado_creacion?: number;
  id_empleado_actualizacion?: number;
  tipo_producto?: TipoProducto;
  materiales?: ProductoMaterial[];
  inventario?: Inventario;
}

export interface TipoProducto {
  id_tipo_producto: number;
  nombre: string;
  id_categoria: number;
  descripcion?: string;
  estado: "ACTIVO" | "INACTIVO";
  categoria?: CategoriaProducto;
}

export interface CategoriaProducto {
  id_categoria: number;
  nombre_categoria: string;
  descripcion?: string;
  categoria_padre?: number;
  estado: "ACTIVO" | "INACTIVO";
  subcategorias?: CategoriaProducto[];
}

export interface MaterialProducto {
  id_material: number;
  nombre_material: string;
  descripcion?: string;
  estado: "ACTIVO" | "INACTIVO";
}

export interface ProductoMaterial {
  id_producto_material: number;
  id_producto: number;
  id_material: number;
  es_material_principal: boolean;
  fecha_asignacion: string;
  id_empleado_asignacion?: number;
  estado: "ACTIVO" | "INACTIVO";
  material?: MaterialProducto;
}

export interface Inventario {
  id_inventario: number;
  id_producto: number;
  sucursal: string;
  ubicacion_fisica?: string;
  cant_disponible: number;
  cant_reservada: number;
  cant_minima: number;
  cant_maxima: number;
  cant_punto_reorden: number;
  precio_costo_actual: number;
  precio_costo_promedio: number;
  precio_venta_actual: number;
  margen_utilidad: number;
  fecha_ultima_entrada?: string;
  fecha_ultima_salida?: string;
  estado: "DISPONIBLE" | "AGOTADO" | "RESERVADO" | "DESCONTINUADO";
  fecha_actualizacion: string;
}

export interface ProductoFilters {
  search?: string;
  estado?: Estado;
  id_tipo_producto?: number;
  id_categoria?: number;
  precio_min?: number;
  precio_max?: number;
  stock_min?: number;
  stock_max?: number;
}

export interface ProductoSort {
  field: keyof Producto;
  direction: "asc" | "desc";
}
