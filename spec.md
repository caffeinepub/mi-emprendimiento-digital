# Barbería Profesional - Sitio Web y Blog

## Current State
Proyecto nuevo, sin código previo.

## Requested Changes (Diff)

### Add
- Sitio web completo para un barbero emprendedor en Caracas, Venezuela
- Página de inicio (Hero con foto, nombre del barbero, slogan)
- Sección de servicios con precios en USD (precios del mercado caraqueño): Corte básico $5, Corte + barba $8, Fade/degradado $7, Arreglo de barba $4, Corte a domicilio +$3
- Galería de fotos de cortes realizados (4 fotos de ejemplo)
- Sección "Sobre mí" del barbero
- Blog con artículos de tendencias y consejos de estilo masculino
- Botón flotante de WhatsApp (+5804125828010) en todas las páginas
- Panel de administración en /admin para gestionar blog, galería y precios
- Diseño oscuro, masculino, con acentos dorados

### Modify
- N/A (proyecto nuevo)

### Remove
- N/A

## Implementation Plan
1. Backend: Actor Motoko con tipos para servicios, posts de blog, galería
2. Frontend: React con Tailwind, diseño oscuro carbón + dorado
3. Páginas: Home, Servicios, Galería, Blog, Sobre Mí, Admin
4. Botón flotante WhatsApp en layout global
5. Admin panel para editar precios, posts y fotos
