# Guía de Colores y Foregrounds en Tailwind v4

Esta guía explica cómo funciona el sistema de colores de la aplicación, centrándose en la diferencia entre los colores base (como `primary`) y sus variantes de contraste (`primary-foreground`).

---

## 🏗️ Cómo se definen los colores

En este proyecto usamos **Tailwind CSS v4**, lo que significa que los colores se gestionan directamente a través de variables CSS y la directiva `@theme`.

### 1. Variables CSS nativas
En `src/shared/styles/globals.css`, definimos los valores visuales:

```css
:root {
  --primary: hsl(215 75% 38%);        /* El color de fondo (Azul) */
  --primary-foreground: oklch(0.985 0 0); /* El color del texto (Blanco) */
}
```

### 2. Mapeo en el Tema de Tailwind
Tailwind toma esas variables y las convierte en "tokens" de color usando el prefijo `--color-`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

---

## 🎨 Diferencia entre `primary` y `primary-foreground`

| Nombre | Propósito | ¿Cuándo usarlo? |
| :--- | :--- | :--- |
| **`primary`** | Es el color de identidad de tu marca. | Como fondo de botones, cabeceras o para destacar textos sobre fondos blancos. |
| **`primary-foreground`** | Es el color de **contraste** diseñado para ser leído sobre el primario. | **Siempre** que el fondo del elemento sea el color primario. |

---

## 🛠️ El prefijo `text-` y otros

Al definir `--color-primary`, Tailwind genera automáticamente una serie de clases de utilidad. El prefijo determina qué propiedad CSS se verá afectada:

*   **`text-primary`**: Cambia la propiedad `color` (el color del texto).
*   **`bg-primary`**: Cambia la propiedad `background-color`.
*   **`border-primary`**: Cambia el color del borde.

### Ejemplo práctico: La pareja perfecta
Para que un elemento sea accesible y legible, siempre debes usarlos en pareja:

```tsx
// ✅ Correcto: Fondo oscuro, texto claro (contraste alto)
<div className="bg-primary text-primary-foreground">
  Contenido legible
</div>

// ❌ Incorrecto: Fondo oscuro, texto del mismo color (contraste nulo)
<div className="bg-primary text-primary">
  Contenido invisible
</div>
```

---

## 💡 Regla de Oro
Si usas una clase de fondo personalizada (ej. `bg-primary`, `bg-destructive`, `bg-accent`), usa siempre la variante `-foreground` correspondiente para el texto que va dentro.

Esto garantiza que si mañana decides cambiar el azul primario por un amarillo brillante, solo tendrás que actualizar `--primary-foreground` a negro en tu CSS y todo el proyecto seguirá siendo legible de forma automática.
