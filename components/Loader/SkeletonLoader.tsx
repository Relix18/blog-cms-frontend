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

export function PostDetailLoader() {
  return (
    <div className="">
      <Skeleton className="h-12" />
      <div className="md:w-[80%] w-[95%] mt-4 space-y-2 flex flex-col m-auto">
        <Skeleton className="h-14 w-[100%]" />
        <Skeleton className="h-14 w-[40%]" />
        <div className="flex pb-2 space-x-2">
          <Skeleton className="h-6 w-[12%]" />
          <Skeleton className="h-6 w-[12%]" />
          <Skeleton className="h-6 w-[12%]" />
        </div>
        <Skeleton className="h-[400px] w-[100%]" />
      </div>
    </div>
  );
}
