# Crear y Crecer - Paquetes y Precios

## Current State
Plataforma 'Crear y Crecer' con homepage, blog, panel admin, boton WhatsApp flotante y burbuja de bienvenida. El backend tiene BlogPost, Testimonial, Subscriber y ContactMessage. No existe seccion de precios ni paquetes de servicios.

## Requested Changes (Diff)

### Add
- Tipo `ServicePackage` en el backend con campos: id, name, description, price (en USD), features (lista), isPopular, maintenancePrice, active
- Funciones backend: `getServicePackages`, `upsertServicePackage`, `deleteServicePackage` (solo admin)
- Seccion de precios/paquetes en HomePage con 3 paquetes predeterminados: Basico, Estandar, Premium
- Cada paquete muestra precio de creacion + precio de mantenimiento mensual
- Nota visible: los precios estan sujetos a actualizacion segun el valor del dolar
- Panel de administracion de paquetes en AdminPage: crear, editar y eliminar paquetes y actualizar precios

### Modify
- HomePage: agregar seccion de paquetes entre las secciones existentes
- AdminPage: agregar tab/seccion para gestionar paquetes de servicios y precios

### Remove
- Nada

## Implementation Plan
1. Agregar tipo ServicePackage y funciones CRUD al backend Motoko
2. Actualizar HomePage con seccion de paquetes visualmente atractiva
3. Agregar gestion de paquetes al AdminPage
4. Incluir nota sobre actualizacion de precios por variacion del dolar
