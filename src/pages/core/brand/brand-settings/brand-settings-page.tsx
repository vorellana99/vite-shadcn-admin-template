import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Separator } from "@/shared/ui/separator"
import { Building, Palette, Image as ImageIcon, Globe } from "lucide-react"

export default function BrandSettingsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Configuración de Marca</h2>
                <p className="text-muted-foreground">
                    Personaliza la identidad visual y los detalles corporativos de tu organización.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="general" className="gap-2">
                        <Building className="size-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="gap-2">
                        <Palette className="size-4" />
                        Apariencia
                    </TabsTrigger>
                    <TabsTrigger value="assets" className="gap-2">
                        <ImageIcon className="size-4" />
                        Logos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Información Corporativa</CardTitle>
                                <CardDescription>
                                    Datos básicos que aparecerán en facturas y comunicaciones.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="brand-name">Nombre de la Marca</Label>
                                    <Input id="brand-name" defaultValue="Acme Corp" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website">Sitio Web</Label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center px-3 bg-muted rounded-md border border-input text-muted-foreground text-sm">
                                            <Globe className="size-4 mr-2" />
                                            https://
                                        </div>
                                        <Input id="website" defaultValue="acme.com" className="flex-1" />
                                    </div>
                                </div>
                                <Separator />
                                <div className="pt-2">
                                    <Button>Guardar Cambios</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Estado de la Cuenta</CardTitle>
                                <CardDescription>Resumen de tu suscripción actual.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                                        <span className="text-sm font-medium">Plan</span>
                                        <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Enterprise</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                                        <span className="text-sm font-medium">Usuarios</span>
                                        <span className="text-sm">45 / 100</span>
                                    </div>
                                    <Button variant="outline" className="w-full">Ver Facturación</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sistema de Colores</CardTitle>
                            <CardDescription>Configura los colores principales de tu interfaz.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground italic">Editor de temas visuales próximamente...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="assets">
                    <Card>
                        <CardHeader>
                            <CardTitle>Logotipos</CardTitle>
                            <CardDescription>Sube las variantes de tu logo para diferentes temas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground italic">Gestor de archivos próximamente...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
