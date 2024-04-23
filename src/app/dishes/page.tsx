import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex w-full max-w-screen-2xl grow flex-col items-center self-center p-4 text-2xl lg:flex-row lg:items-start lg:gap-4 lg:px-36">
      <div className="flex w-full flex-col lg:w-1/2">
        <ul className="flex self-end">
          <li className="flex h-full items-center p-1">
            <button
              type="button"
              className="h-6 w-6 rounded-full border-2 border-tertiary hover:bg-secondary"
            ></button>
          </li>
          <li className="flex h-full items-center p-1">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-tertiary hover:bg-secondary"
            >
              <Image
                src="/lock.svg"
                alt="locked lock"
                height={16}
                width={16}
              ></Image>
            </button>
          </li>
          <li className="flex h-full items-center p-1">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-tertiary hover:bg-secondary"
            >
              <Image
                src="/lock.svg"
                alt="locked lock"
                height={16}
                width={16}
              ></Image>
            </button>
          </li>
        </ul>
        <Image
          src="/bolognese.jpg"
          alt="A food dish"
          height={512}
          width={512}
          className="w-full rounded-xl"
        ></Image>
      </div>
      <div className="mt-2 w-full lg:mt-8 lg:w-1/2">
        <input
          type="text"
          name="country-search"
          id="country-search"
          placeholder="Enter a Country Name"
          className="w-full rounded-md border-2 border-tertiary px-2 py-1 text-lg"
        />
        <ul className="flex flex-col p-2 text-base">
          <li className="flex border-b border-tertiary py-1">
            <h3 className="w-1/2">Sweden</h3>
            <p className="w-1/2"> 4000.0 km</p>
            <Image
              src="/north-arrow.svg"
              alt="arrow pointing north"
              height={20}
              width={20}
            ></Image>
          </li>
          <li className="flex border-b border-tertiary py-1">
            <h3 className="w-1/2">Finland</h3>
            <p className="w-1/2"> 4000.0 km</p>
            <Image
              src="/north-arrow.svg"
              alt="arrow pointing north"
              height={20}
              width={20}
            ></Image>
          </li>
          <li className="flex border-b border-tertiary py-1">
            <h3 className="w-1/2">Denmark</h3>
            <p className="w-1/2"> 4000.0 km</p>
            <Image
              src="/north-arrow.svg"
              alt="arrow pointing north"
              height={20}
              width={20}
            ></Image>
          </li>
        </ul>
      </div>
    </main>
  )
}
