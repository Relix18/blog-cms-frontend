import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePostLoader() {
  return (
    <div className="">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[60%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
      <div className="flex items-center justify-between my-6">
        <Skeleton className="h-4 w-[50%]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-[60px]" />
          <Skeleton className="h-8 w-[60px]" />
        </div>
      </div>
    </div>
  );
}
