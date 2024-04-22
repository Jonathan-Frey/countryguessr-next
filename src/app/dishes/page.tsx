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
    // <main className="flex w-full max-w-2xl grow flex-col self-center p-4 text-2xl xl:relative xl:max-w-screen-xl xl:flex-row">
    // <Image
    //   src="/bolognese.jpg"
    //   alt="A food dish"
    //   height={512}
    //   width={512}
    //   className="h-min w-full rounded-xl xl:w-1/2"
    // ></Image>
    //   {/* make into clues component, only needs access to the amountof guesses made */}
    //   <aside className="flex grow justify-center pb-32 pt-4 text-center text-base xl:pb-0 xl:pt-0">
    //     <ul className="flex w-full flex-col gap-4 xl:w-11/12">
    //       <li className="rounded-xl border-2 border-tertiary p-2 shadow-sm">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
    //         inventore vitaeatem iure animi deleniti aspernatur ipsam!
    //       </li>
    //       <li className="rounded-xl border-2 border-tertiary p-2 shadow-sm">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
    //         inventore vitae cum nisi impedit est architecto ab sunt tempore, ad
    //         reprehenderit voluptatem iure animi deleniti aspernatur ipsam!
    //       </li>
    //       <li className="rounded-xl border-2 border-tertiary p-2 shadow-sm">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
    //         inventore vitae cumque quo rerum nisi impedit est architecto ab sunt
    //         ehenderit voluptatem iure animi delen
    //       </li>
    //     </ul>
    //   </aside>
    //   {/* make into search field component, need to create a context for amount of guesses made */}
    // <form className="fixed bottom-0 left-0 mb-4 ms-4 flex h-min w-fit flex-col items-center rounded-xl bg-tertiary p-4 xl:absolute">
    //   <header className="flex w-full justify-between px-2">
    //     <h3>guesses remaining: 3</h3>
    //     <button type="button">
    //       <Image
    //         alt="dropdown button"
    //         src="/placeholder.svg"
    //         height={16}
    //         width={16}
    //         className="inline-block"
    //       ></Image>
    //     </button>
    //   </header>
    //   <ul>
    //     <li>Sweden</li>
    //     <li>Finland</li>
    //     <li>Denmark</li>
    //   </ul>
    //   {/* <label htmlFor="country-search" className="pb-4">
    //     Guess the country of origin of this dish!
    //   </label> */}
    //   <input
    //     type="text"
    //     name="country-search"
    //     id="country-search"
    //     className="w-full rounded-xl p-2"
    //   />
    // </form>
    // </main>
  )
}
