import { Skeleton } from "@/shared/ui/skeleton"

export function PageSkeleton() {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 animate-in fade-in duration-500">
            {/* Page Header placeholder */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Cards section placeholder */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>

            {/* Main chart placeholder */}
            <Skeleton className="h-[400px] w-full rounded-xl" />

            {/* Table placeholder */}
            <div className="rounded-xl border border-border/50 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-8 w-24" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="mb-2 h-10 w-full" />
                ))}
            </div>
        </div>
    )
}
