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

export function FeaturedPostLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
export function FilterPostLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-48" />
        <div className="py-2 space-y-2 px-4">
          <Skeleton className="h-7" />
          <div className="py-2 space-y-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LatestPostLoader() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-48 w-full md:w-1/3" />
        <div className="flex-1">
          <div className="py-2 space-y-2 px-4">
            <Skeleton className="h-7" />
            <div className="py-2 space-y-2">
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex ">
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-48 w-full md:w-1/3" />
        <div className="flex-1">
          <div className="py-2 space-y-2 px-4">
            <Skeleton className="h-7" />
            <div className="py-2 space-y-2">
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex ">
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-48 w-full md:w-1/3" />
        <div className="flex-1">
          <div className="py-2 space-y-2 px-4">
            <Skeleton className="h-7" />
            <div className="py-2 space-y-2">
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex ">
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LikedPostLoader() {
  return (
    <div className="space-y-8 mt-4">
      <div className="py-2 space-y-2 px-4">
        <Skeleton className="h-7" />
        <div className="py-2 space-y-2">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
        <div className="flex justify-between">
          <div className="flex ">
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
      <div className="py-2 space-y-2 px-4">
        <Skeleton className="h-7" />
        <div className="py-2 space-y-2">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
        <div className="flex justify-between">
          <div className="flex ">
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}

export function RecentActivityLoader() {
  return (
    <div className="space-y-8 mt-4">
      <div className="py-2 space-y-2 px-4">
        <Skeleton className="h-7 w-[70%]" />
        <Skeleton className="h-5 w-[60%]" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="py-2 space-y-2 px-4">
        <Skeleton className="h-7 w-[80%]" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="py-2 space-y-2 px-4">
        <Skeleton className="h-7 w-[75%]" />
        <Skeleton className="h-5 w-[65%]" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
}

export function DashboardLoader() {
  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <div className=" space-y-2 w-full flex-col md:flex-row flex md:items-center justify-between">
        <div className="py-2 space-y-2 w-[60%]">
          <Skeleton className="h-10 w-[100%] md:w-[70%]" />
          <Skeleton className="h-6 w-[50%] md:w-[30%]" />
        </div>
        <Skeleton className="h-8 w-[40%] md:w-[20%]" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-8">
        <Skeleton className="h-32 w-[100%]" />
        <Skeleton className="h-32 w-[100%]" />
        <Skeleton className="h-32 w-[100%]" />
        <Skeleton className="h-32 w-[100%]" />
      </div>
      <div className="w-full md:w-[400px]">
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <div className="my-4 w-[200px] flex float-right">
        <Skeleton className="h-8 w-[100%]" />
      </div>
      <div className="grid mt-16 gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] w-[100%]" />
        <Skeleton className="h-[300px] w-[100%]" />
      </div>
    </div>
  );
}
