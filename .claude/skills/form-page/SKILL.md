---
name: form-page
description: This skill should be used when the user asks to "crear una página de formulario", "nuevo formulario", "add a form page", "aplicar el patrón de formulario", "crear form", "form con validación", "implementar formulario", or mentions creating, refactoring, or scaffolding a form page using the project's standard components (FormPageCard, FormSection, FormField, FormSelect, FormTextarea). Also activate when the user provides ARGUMENTS describing a new form to create.
version: 0.3.0
argument-hint: <descripción del formulario — entidad, campos, secciones>
allowed-tools: [Read, Glob, Grep, Edit, Write]
---

# Form Page Skill

## Componentes disponibles

Todos están en `src/shared/components/forms/` y `src/shared/components/`:

| Componente | Ruta de importación | Rol |
|-----------|---------------------|-----|
| `FormPageCard` | `@/shared/components/forms/form-page-card` | Shell completo: header azul, gradiente, footer |
| `FormSection` | `@/shared/components/forms/form-section` | Agrupa campos con icono + título |
| `FormField` | `@/shared/components/forms/form-field` | Label + campo + error |
| `FormSelect` | `@/shared/components/forms/form-select` | Select con estilos del proyecto |
| `FormTextarea` | `@/shared/components/forms/form-textarea` | Textarea con estilos del proyecto |
| `AppInput` | `@/shared/components/inputs/app-input` | Input con hover/focus primary |
| `AppButton` | `@/shared/components/buttons/app-button` | Botón con estilos del proyecto |
| `DatePicker` | `@/shared/components/date-picker/date-picker` | Selector de fecha |
| `ToggleGroup` / `ToggleGroupItem` | `@/shared/ui/toggle-group` | Selección exclusiva visual |
| `SelectItem` | `@/shared/ui/select` | Opciones del FormSelect |

Ver API detallada en `references/component-api.md`.

---

## ⚡ Referencia canónica — leer antes de implementar

**Siempre leer este archivo antes de crear o refactorizar cualquier formulario.** Es la fuente de verdad para estructura, estado, validación y JSX.

| Archivo | Patrones que demuestra |
|---------|------------------------|
| `src/pages/modules/examples/students-page/student-form-page.tsx` | **GUÍA PREVALECIENTE** — `useForm` + `zodResolver`, `register`, `Controller`, `formDefaults` desde schema, `handleSubmit(onSubmit, onInvalid)`, `reset()`, `watch()`, animaciones escalonadas, `FormPageCard`, `FormSection`, `FormField`, `labelSize="sm"`, Select coloreado con `Controller`, `ImageUploadZone`, modo crear/editar |
| `src/pages/modules/forms/advanced-forms-page/advanced-forms-page.tsx` | `FormTextarea`, `ToggleGroup`/`ToggleGroupItem` con colores |

No reproducir esos patrones inline — implementar directamente siguiendo los archivos de referencia.

---

## Patrón de estado y validación — react-hook-form + zod

**Este es el único patrón a usar.** No usar `useState` por campo ni `safeParse` manual.

### Schema y defaults (en archivo `*-schema.ts` separado)

```ts
// mi-entidad-schema.ts
import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email no válido"),
    // campos opcionales
    telefono: z.string().optional(),
})

export const formDefaults: z.infer<typeof formSchema> = {
    nombre: "",
    email: "",
    telefono: "",
}
```

`formDefaults` va en el schema, no en la página. Al ser tipado como `z.infer<typeof formSchema>`, TypeScript fuerza que esté en sync con el schema.

### Setup del form (en la página)

```tsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { formSchema, formDefaults } from "./mi-entidad-schema"

type FormValues = z.infer<typeof formSchema>

const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaults,
})
```

### Registrar campos

**Input nativo** → `register`:
```tsx
<FormField label="Nombre" htmlFor="f-nombre" error={errors.nombre?.message} labelSize="sm">
    <AppInput id="f-nombre" {...register("nombre")} placeholder="ej. Juan García" />
</FormField>
```

**Input controlado** (DatePicker, Select coloreado, ToggleGroup) → `Controller`:
```tsx
<FormField label="Fecha" htmlFor="f-fecha" labelSize="sm">
    <Controller
        control={control}
        name="fecha"
        render={({ field }) => (
            <DatePicker
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Seleccionar fecha"
                className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
            />
        )}
    />
</FormField>
```

### Submit y reset

```tsx
function onSubmit(data: FormValues) {
    // data ya está validado por zodResolver
    // guardar, navegar, etc.
    toast.success("Guardado exitosamente.")
}

function onInvalid() {
    toast.error("Por favor, corrija los errores antes de guardar.")
}

function handleReset() {
    reset(entidadOriginal ? toFormValues(entidadOriginal) : formDefaults)
}

// En el JSX:
<form id="mi-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
```

### watch() para valores reactivos en el título

```tsx
// Mostrar el nombre actual en el título del form:
title={isEditing ? `Editar: ${watch("nombre")}` : "Nuevo Registro"}
```

---

## Select con colores — excepción al patrón estándar

Cuando el campo representa un **estado o prioridad con semántica de color** (activo, suspendido, urgente, etc.), **NO usar `FormSelect`** — no expone `className` en el trigger. Usar `Select` nativo con `SelectTrigger` coloreado dentro de un `Controller`.

```tsx
<FormField label="Estado" htmlFor="f-estado" labelSize="sm">
    <Controller
        control={control}
        name="status"
        render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="f-estado" className={cn(
                    "w-full transition-colors",
                    field.value === "active"    && "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
                    field.value === "inactive"  && "border-slate-400/50 bg-slate-500/5 text-slate-600",
                    field.value === "pending"   && "border-amber-500/50 bg-amber-500/5 text-amber-700",
                    field.value === "suspended" && "border-red-500/50 bg-red-500/5 text-red-700",
                    field.value === "vip"       && "border-violet-500/50 bg-violet-500/5 text-violet-700",
                )}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active"    className="text-emerald-700 focus:bg-emerald-500/8">Active</SelectItem>
                    <SelectItem value="inactive"  className="text-slate-600 focus:bg-slate-500/8">Inactive</SelectItem>
                    <SelectItem value="pending"   className="text-amber-700 focus:bg-amber-500/8">Pending</SelectItem>
                    <SelectItem value="suspended" className="text-red-700 focus:bg-red-500/8">Suspended</SelectItem>
                    <SelectItem value="vip"       className="text-violet-700 focus:bg-violet-500/8">VIP</SelectItem>
                </SelectContent>
            </Select>
        )}
    />
</FormField>
```

**Paleta estándar:**
- `active` / activo → emerald-500
- `inactive` / inactivo → slate-400
- `pending` / pendiente → amber-500
- `suspended` / suspendido → red-500
- `vip` → violet-500
- `urgente` / high → destructive (red)
- `normal` / low → primary (blue)

---

## Animaciones escalonadas

Cada `FormSection` va envuelta en un `div` con delay incremental:

```tsx
<div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
    <FormSection title="..." icon={Icon} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* campos */}
    </FormSection>
</div>

<div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
    {/* segunda sección */}
</div>
```

Delays: 0.05s → 0.12s → 0.19s → 0.26s → 0.33s

---

## Wiring — registrar ruta y menú

### routes.tsx (`src/app/router/routes.tsx`)
```tsx
const MiFormPage = lazy(() => import("@/pages/modules/forms/mi-form-page/mi-form-page"))
// dentro de <Route element={<AppLayout />}>:
<Route path="/forms/mi-form" element={<MiFormPage />} />
```

### menu.ts (`src/layouts/app-layout/menu.ts`)
Cambiar el ítem correspondiente de `url: "#"` a `url: "/forms/mi-form"`.

---

## Modo aplicar — refactorizar un form existente

Leer el archivo existente y aplicar estos checks en orden:

1. **Shell manual → `FormPageCard`**
   - Si usa `Card` + `CardHeader` + `CardFooter` + botón "Back/Volver" manual → reemplazar todo con `FormPageCard`
   - El `formId` del `FormPageCard` debe coincidir con el `id` del `<form>`

2. **Estado individual o fields+set() → `useForm`**
   - Si tiene múltiples `useState` por campo o usa el patrón `fields`+`set()` → migrar a `useForm<FormValues>` + `zodResolver`
   - Inputs nativos → `{...register("campo")}`
   - Inputs controlados (DatePicker, Select, ToggleGroup) → `Controller`
   - Si el form soporta **modo edición**, `handleReset` usa `reset(entidad ? toFormValues(entidad) : formDefaults)`

3. **`safeParse` manual → `handleSubmit(onSubmit, onInvalid)`**
   - Si `handleSubmit` llama `formSchema.safeParse(fields)` → reemplazar con `handleSubmit(onSubmit, onInvalid)`
   - `onInvalid` debe llamar `toast.error(...)`

4. **`INITIAL_STATE` inline → `formDefaults` en schema**
   - Si los defaults están definidos en la página → moverlos al archivo `*-schema.ts` como `formDefaults: z.infer<typeof formSchema>`

5. **Secciones custom → `FormSection`**
   - Si usa `<h3>`, `<h2>` o `<div>` con título manual → reemplazar con `FormSection title="..." icon={Icon}`

6. **Animaciones → agregar si faltan**
   - Si las secciones no tienen `animate-fade-in-up` → agregar con delays escalonados

7. **`labelSize="sm"` → agregar a todos los `FormField` si falta**

8. **Select general → `FormSelect`**
   - Si usa `SelectTrigger` sin className de colores reactivos → reemplazar con `FormSelect`
   - **EXCEPCIÓN**: Si el select representa un estado/prioridad con colores semánticos → mantener `Select` nativo con `Controller` (ver sección "Select con colores")

9. **`<textarea>` nativo → `FormTextarea`**

10. **`useNavigate` — regla correcta**
    - `FormPageCard` maneja el botón "Volver" internamente → NO importar `useNavigate` solo para el back button
    - **SÍ mantener `useNavigate`** si el submit redirige a otra ruta después de guardar

---

## Estructura de carpetas para una nueva página

```
src/pages/modules/<modulo>/
└── mi-entidad-form-page/
    ├── mi-entidad-form-page.tsx   ← página principal
    └── mi-entidad-schema.ts       ← formSchema + formDefaults
```
