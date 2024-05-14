export default function Loading() {
  return (
    <main className="flex w-full max-w-screen-md grow flex-col items-center self-center p-4 text-2xl lg:flex-row lg:items-start lg:gap-4">
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex justify-end">
          <div className="flex">
            <div className="flex h-full items-center gap-1 p-1">
              <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-300"></div>
      </div>
      <div className="mt-2 w-full lg:mt-8 lg:w-1/2">
        <div className=" h-10 w-full animate-pulse rounded-md bg-gray-300"></div>
        <div className="flex flex-col p-2">
          <div className="m-1 h-8 animate-pulse bg-gray-300"></div>
          <div className="m-1 h-8 animate-pulse bg-gray-300"></div>
          <div className="m-1 h-8 animate-pulse bg-gray-300"></div>
        </div>
      </div>
    </main>
  )
}
