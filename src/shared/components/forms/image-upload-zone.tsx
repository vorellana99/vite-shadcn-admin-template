import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { AppButton } from "@/shared/components/buttons/app-button"

interface ImageUploadZoneProps {
    preview: string | null
    onFileSelect: (file: File) => void
    onClear: () => void
    accept?: string
    uploadLabel?: string
    uploadHint?: string
    changeLabel?: string
    removeLabel?: string
    previewAlt?: string
    className?: string
}

export function ImageUploadZone({
    preview,
    onFileSelect,
    onClear,
    accept = "image/*",
    uploadLabel = "Click to upload an image",
    uploadHint = "PNG, JPG, WEBP — max 10 MB",
    changeLabel = "Change",
    removeLabel = "Remove",
    previewAlt = "Preview",
    className,
}: ImageUploadZoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) onFileSelect(file)
    }

    function handleClear() {
        onClear()
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <div className={className}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleChange}
            />
            {preview ? (
                <div className="relative group rounded-lg overflow-hidden border border-slate-300 bg-muted/20">
                    <img
                        src={preview}
                        alt={previewAlt}
                        className="w-full max-h-64 object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <AppButton
                            type="button"
                            variant="outline"
                            className="bg-white/90 hover:bg-white text-sm"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {changeLabel}
                        </AppButton>
                        <AppButton
                            type="button"
                            variant="outline"
                            className="bg-white/90 hover:bg-white text-sm text-destructive border-destructive/40"
                            onClick={handleClear}
                        >
                            {removeLabel}
                        </AppButton>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed border-slate-300 hover:border-primary/60 hover:bg-primary/[0.02] transition-colors cursor-pointer text-muted-foreground"
                >
                    <ImageIcon className="w-8 h-8 opacity-50" />
                    <div className="text-center">
                        <p className="text-sm font-medium">{uploadLabel}</p>
                        <p className="text-xs mt-0.5 opacity-70">{uploadHint}</p>
                    </div>
                </button>
            )}
        </div>
    )
}
