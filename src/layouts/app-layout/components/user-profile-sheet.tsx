import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/shared/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Separator } from "@/shared/ui/separator"
import { BadgeCheck, Mail, User } from "lucide-react"

interface UserProfileSheetProps {
    user: {
        name: string
        email: string
        role: string
        avatar: string
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UserProfileSheet({ user, open, onOpenChange }: UserProfileSheetProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                        <BadgeCheck className="size-6 text-primary" />
                        Perfil de Usuario
                    </SheetTitle>
                    <SheetDescription>
                        Gestiona tu información personal y preferencias.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-8">
                    {/* Avatar and Basic Info */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Avatar className="h-24 w-24 border-4 border-muted shadow-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{user.role}</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                            Cambiar Avatar
                        </Button>
                    </div>

                    <Separator />

                    {/* User Details Form */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="size-4" />
                                    Nombre Completo
                                </Label>
                                <Input id="name" defaultValue={user.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="size-4" />
                                    Correo Electrónico
                                </Label>
                                <Input id="email" type="email" defaultValue={user.email} />
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <Button className="w-full">Guardar Cambios</Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
