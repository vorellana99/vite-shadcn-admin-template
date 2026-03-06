import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"

export default function BrandSettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Configuración de Marca</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Identidad Visual</CardTitle>
                        <CardDescription>
                            Gestiona los logotipos, colores y tipografía de tu marca.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Próximamente: Panel de edición de marca.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
