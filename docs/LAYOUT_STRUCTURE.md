# Estructura del Layout Principal (`app-layout`)

Esta guía documenta la organización y el diseño modular utilizado en `src/layouts/app-layout`. El objetivo de esta estructura es separar las responsabilidades de disposición global de los detalles de implementación granular.

## Organización de Carpetas

La arquitectura se divide en dos niveles principales:

### 1. Nivel Raíz (`src/layouts/app-layout/`)
Contiene los componentes **orquestadores**. Su función es definir la composición visual general y manejar los flujos de datos principales.

| Archivo | Función |
| :--- | :--- |
| `app-layout.tsx` | Componente principal que ensambla el `Sidebar`, el `Topbar` y el área de contenido (`Outlet`). |
| `sidebar.tsx` | Define la estructura de la barra lateral (Header, Content, Footer). |
| `topbar.tsx` | Define la estructura de la barra superior (Trigger, Título, Menús de usuario). |
| `menu.ts` | Definición centralizada de los items de navegación y datos del usuario. |

### 2. Subcarpeta de Componentes (`src/layouts/app-layout/components/`)
Contiene las **piezas modulares**. Son componentes atómicos o moleculares que se encargan de una sola pieza de la interfaz.

*   **`brand-section.tsx`**: El área del logo y nombre de empresa en el sidebar.
*   **`nav-main.tsx`**: La lógica y visualización de los enlaces de navegación.
*   **`topbar-user-menu.tsx`**: Menú desplegable del perfil de usuario.
*   **`topbar-notifications.tsx`**: Botón y panel de notificaciones.
*   **`page-content.tsx`**: Contenedor estándar para el contenido dinámico de las páginas.
*   **`tenant-switcher.tsx`**: Selector de cuenta o contexto (preparado para multi-tenancy).

## Principios de Diseño

1.  **Encapsulamiento**: Si necesitas cambiar la apariencia de las notificaciones, solo modificas `topbar-notifications.tsx`. El layout general permanece intacto.
2.  **Facilidad de Navegación**: Los archivos de raíz son cortos y fáciles de leer, permitiendo entender la estructura del layout en pocos segundos.
3.  **Convención de Nombres**: Los componentes del Topbar llevan el prefijo `topbar-` para facilitar su identificación dentro de la subcarpeta `components/`.

---
*Última actualización: Marzo 2026*
