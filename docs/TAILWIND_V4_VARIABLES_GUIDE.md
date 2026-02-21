# Entendiendo las Variables en Tailwind CSS v4

Tailwind CSS v4 trae una gran mejora: ya no necesitas el archivo `tailwind.config.js` para añadir tus propios colores o espaciados. Todo se hace directamente desde CSS puro usando la directiva `@theme inline` y la sintaxis de variables de CSS (`--variables`).

Pero, **¿cómo sabe Tailwind qué clases crear?**

El secreto está en los **prefijos obligatorios** o "namespaces" que Tailwind reconoce. Cuando usas un prefijo específico, el motor interno de Tailwind actúa como una fábrica y genera docenas de combinaciones para ti.

---

## 🎨 1. El Prefijo Mágico de Color (`--color-X`)

Si quieres crear un color personalizado, el secreto no está en el nombre del color, sino en colocarle el prefijo `--color-`.

### Paso 1: Mapear el color en el CSS
Vas a tu archivo global (ej. `globals.css`) y escribes esto dentro de `@theme inline`:

```css
@theme inline {
  /* Al usar --color-, Tailwind entiende que "mi-marca" es un COLOR */
  --color-mi-marca: var(--mi-marca);
}

:root {
  /* Aquí le das el valor visual real usando CSS estándar */
  --mi-marca: #FF5733; 
}
```

### Paso 2: Lo que ocurre por detrás
Tailwind lee la palabra `--color-mi-marca`. Inmediatamente y de forma automática, el framework programa por ti todas estas clases de utilidad para que puedas usarlas en tu HTML:

- Fondos: `bg-mi-marca`
- Textos: `text-mi-marca`
- Bordes: `border-mi-marca`
- Contornos: `outline-mi-marca`
- SVG: `fill-mi-marca`, `stroke-mi-marca`

### Paso 3: Uso práctico en React/HTML
```html
<!-- Ahora todas estas clases existen y aplicarán el color naranja #FF5733 -->
<div class="bg-mi-marca border-2 border-mi-marca text-white">
  <p class="text-mi-marca hover:bg-mi-marca">Hola Mundo</p>
</div>
```

---

## 📏 2. Otros Prefijos para Espaciados (`--spacing-X`)

Tailwind no solo hace magia con colores. Si usas el prefijo `--spacing-`, Tailwind creará utilidades de tamaño (width, height, paddings y margins).

### Paso 1: CSS
```css
@theme inline {
  /* Tailwind detecta --spacing- y sabe que "enorme" es para márgenes/tamaños */
  --spacing-enorme: 5rem;
}
```

### Paso 2: Las clases que "nacen":
- Margin: `m-enorme`, `mt-enorme` (top), `mb-enorme` (bottom)
- Padding: `p-enorme`, `py-enorme`, `px-enorme`
- Ancho/Alto: `w-enorme`, `h-enorme`
- Brechas (Gap): `gap-enorme`

### Paso 3: Uso práctico
```html
<!-- Este div tendrá un ancho, alto y margen de 5rem -->
<div class="h-enorme w-enorme m-enorme bg-blue-500">
  Un cuadro gigante con gran margen
</div>
```

---

## ⭕ 3. Prefijo para Bordes Redondeados (`--radius-X`)

### Paso 1: CSS
```css
@theme inline {
  /* Tailwind detecta --radius- y lo asigna a bordes redondeados */
  --radius-suave: 12px;
}
```

### Paso 2: Clases generadas
- `rounded-suave`
- `rounded-t-suave` (top)
- `rounded-b-suave` (bottom)

### Paso 3: Uso
```html
<!-- Este botón tendrá border-radius: 12px -->
<button class="bg-blue-600 rounded-suave">
  Botón Redondeado
</button>
```

---

## 💡 Resumen Táctico

Al usar Tailwind V4, tú eres el arquitecto. Solo necesitas seguir las "palabras clave" del inspector de Tailwind:

| Si quieres crear... | Usa este prefijo | Y Tailwind generará clases como... |
|---------------------|------------------|------------------------------------|
| Un color nuevo | `--color-XXXX` | `bg-XXXX`, `text-XXXX`, `border-XXXX` |
| Un espaciado/tamaño | `--spacing-XXXX` | `p-XXXX`, `m-XXXX`, `w-XXXX`, `h-XXXX` |
| Un tipo de fuente | `--font-XXXX` | `font-XXXX` |
| Una curvatura | `--radius-XXXX` | `rounded-XXXX` |
| Una sombra | `--shadow-XXXX` | `shadow-XXXX` |

El valor de `XXXX` puede ser el nombre que tú quieras (ej: `table-header`, `botonsito`, `secundario`). ¡El truco siempre estuvo en el prefijo!
