import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"

interface AvatarUploadProps {
    src?: string
    alt?: string
    fallbackText?: string
    label?: string
}

export function AvatarUpload({ src, alt, fallbackText, label = "AVATAR PREVIEW" }: AvatarUploadProps) {
    return (
        <div className="md:col-span-1 flex flex-col items-center justify-center gap-3 bg-muted/30 rounded-lg p-4 border border-dashed border-muted-foreground/20">
            <Avatar className="h-24 w-24 border-2 border-background shadow-md">
                <AvatarImage src={src} alt={alt} />
                <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                    {fallbackText ? (
                        fallbackText.substring(0, 2).toUpperCase()
                    ) : (
                        <Camera className="w-8 h-8 opacity-40" />
                    )}
                </AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground font-medium text-center">
                {label}
            </span>
        </div>
    )
}
