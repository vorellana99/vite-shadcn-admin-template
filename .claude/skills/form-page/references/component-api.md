# Component API Reference — Form Page Pattern

## FormPageCard
**Ruta:** `src/shared/components/forms/form-page-card.tsx`
**Importar:** `import { FormPageCard } from "@/shared/components/forms/form-page-card"`

Shell completo de la página. Internamente incluye: `div` scroll wrapper → `Card` → `CardHeader` azul → `CardContent` con gradiente → `CardFooter` con botones.

```ts
interface FormPageCardProps {
    icon: LucideIcon       // ícono del header (lucide-react)
    title: string          // título principal
    subtitle: string       // subtítulo descriptivo debajo del título
    formId: string         // debe coincidir con el id del <form>
    submitText: string     // texto del botón primario (ej. "Registrar Empleado")
    onReset: () => void    // función que limpia el estado del formulario
    children: React.ReactNode  // el elemento <form> completo
}
```

**Nota:** `FormPageCard` llama `useNavigate()` internamente para el botón "Volver". No importar `useNavigate` en la página.

---

## FormSection
**Ruta:** `src/shared/components/forms/form-section.tsx`
**Importar:** `import { FormSection } from "@/shared/components/forms/form-section"`

```ts
interface FormSectionProps {
    title: string        // título de la sección
    icon: LucideIcon     // ícono (lucide-react)
    className?: string   // clase del contenedor de campos — usar para el grid
    children: React.ReactNode
}
```

**Uso típico del className:**
- 2 columnas: `"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"`
- 3 columnas: `"grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4"`
- 1 columna: `"grid grid-cols-1 gap-4"`

---

## FormField
**Ruta:** `src/shared/components/forms/form-field.tsx`
**Importar:** `import { FormField } from "@/shared/components/forms/form-field"`

```ts
interface FormFieldProps {
    label: string          // texto del label
    htmlFor: string        // debe coincidir con el id del input hijo
    error?: string         // mensaje de error (de Zod)
    children: React.ReactNode
    className?: string     // útil para "md:col-span-2" en grid 2-col
    labelSize?: "xs" | "sm" | "base"  // default: "sm"
}
```

Para campo de ancho completo en grid 2-col: `className="md:col-span-2"`.

---

## AppInput
**Ruta:** `src/shared/components/inputs/app-input.tsx`
**Importar:** `import { AppInput } from "@/shared/components/inputs/app-input"`

Extiende `React.ComponentProps<typeof Input>` (shadcn). Agrega automáticamente:
- `border-slate-300`
- `hover:border-primary/60`
- `focus-visible:border-primary focus-visible:ring-primary/20`

Acepta todas las props de `<input>` nativo: `type`, `min`, `max`, `step`, `readOnly`, `disabled`, etc.

```tsx
<AppInput
    id="campo-id"
    value={fields.campo}
    onChange={(e) => set("campo")(e.target.value)}
    placeholder="ej. valor"
    type="text"   // "email" | "tel" | "number" | "password"
/>
```

---

## FormSelect
**Ruta:** `src/shared/components/forms/form-select.tsx`
**Importar:** `import { FormSelect } from "@/shared/components/forms/form-select"`

```ts
interface FormSelectProps {
    id?: string
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
    children: React.ReactNode   // <SelectItem> de @/shared/ui/select
}
```

```tsx
import { FormSelect } from "@/shared/components/forms/form-select"
import { SelectItem } from "@/shared/ui/select"

<FormSelect id="campo-id" value={fields.campo} onValueChange={set("campo")} placeholder="Seleccionar...">
    <SelectItem value="val1">Etiqueta 1</SelectItem>
    <SelectItem value="val2">Etiqueta 2</SelectItem>
</FormSelect>
```

---

## FormTextarea
**Ruta:** `src/shared/components/forms/form-textarea.tsx`
**Importar:** `import { FormTextarea } from "@/shared/components/forms/form-textarea"`

```ts
interface FormTextareaProps extends React.ComponentProps<"textarea"> {
    minHeight?: string   // default: "80px"
}
```

Agrega automáticamente: `border-slate-300`, hover/focus primary, `resize-none`.

```tsx
<FormTextarea
    id="campo-id"
    value={fields.campo}
    onChange={(e) => set("campo")(e.target.value)}
    placeholder="Texto largo..."
    minHeight="100px"   // opcional
/>
```

---

## DatePicker
**Ruta:** `src/shared/components/date-picker/date-picker.tsx`
**Importar:** `import { DatePicker } from "@/shared/components/date-picker/date-picker"`

Almacena la fecha como string ISO (YYYY-MM-DD).

```ts
interface DatePickerProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}
```

```tsx
<DatePicker
    value={fields.fecha}
    onChange={set("fecha")}
    placeholder="Seleccionar fecha"
    className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
/>
```

---

## ToggleGroup / ToggleGroupItem
**Ruta:** `src/shared/ui/toggle-group.tsx`
**Importar:** `import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group"`

Para selección exclusiva (una opción a la vez). Usar `type="single"`.

```tsx
<ToggleGroup
    type="single"
    value={fields.opcion}
    onValueChange={(v) => { if (v) set("opcion")(v) }}
    variant="outline"
    className="w-full justify-start"
>
    <ToggleGroupItem
        value="opcion1"
        className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
    >
        Opción 1
    </ToggleGroupItem>
    <ToggleGroupItem
        value="opcion2"
        className="flex-1 data-[state=on]:bg-destructive data-[state=on]:text-white data-[state=on]:border-destructive"
    >
        Urgente
    </ToggleGroupItem>
</ToggleGroup>
```

**Colores disponibles para `data-[state=on]`:**
- Azul (primary): `data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary`
- Rojo: `data-[state=on]:bg-destructive data-[state=on]:text-white data-[state=on]:border-destructive`
- Ámbar: `data-[state=on]:bg-amber-500 data-[state=on]:text-white data-[state=on]:border-amber-500`
- Verde: `data-[state=on]:bg-emerald-500 data-[state=on]:text-white data-[state=on]:border-emerald-500`

---

## Integración react-hook-form

**Patrón estándar del proyecto.** No usar `useState` por campo ni `safeParse` manual.

### Schema con defaults (archivo separado `*-schema.ts`)

```ts
import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email no válido"),
    fecha: z.string().optional(),
    status: z.enum(["active", "inactive", "pending"]),
})

// Tipado contra el schema — TypeScript fuerza sync
export const formDefaults: z.infer<typeof formSchema> = {
    nombre: "",
    email: "",
    fecha: "",
    status: "active",
}
```

### Setup en la página

```tsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { formSchema, formDefaults } from "./mi-entidad-schema"

type FormValues = z.infer<typeof formSchema>

const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
} = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaults,
})
```

### Inputs nativos → register

```tsx
<FormField label="Nombre" htmlFor="f-nombre" error={errors.nombre?.message} labelSize="sm">
    <AppInput id="f-nombre" {...register("nombre")} placeholder="ej. Juan García" />
</FormField>
```

### Inputs controlados → Controller

Para DatePicker, Select coloreado, ToggleGroup — cualquier componente que no acepta `ref` nativo:

```tsx
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
```

### Submit + reset

```tsx
function onSubmit(data: FormValues) {
    // data ya validado
    toast.success("Guardado exitosamente.")
    navigate("/ruta-destino")
}

function onInvalid() {
    toast.error("Por favor, corrija los errores antes de guardar.")
}

function handleReset() {
    reset(entidadOriginal ? toFormValues(entidadOriginal) : formDefaults)
}

// JSX:
<form id="mi-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
```

### watch() para título reactivo

```tsx
title={isEditing ? `Editar: ${watch("nombre")}` : "Nuevo Registro"}
```

---

## Estructura de carpetas para una nueva página

```
src/pages/modules/<modulo>/
└── mi-entidad-form-page/
    ├── mi-entidad-form-page.tsx   ← página principal
    └── mi-entidad-schema.ts       ← formSchema + formDefaults
```
