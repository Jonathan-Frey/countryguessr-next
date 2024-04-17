import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex w-full max-w-2xl grow flex-col self-center p-4 text-2xl xl:relative xl:max-w-screen-xl xl:flex-row">
      <Image
        src="/bolognese.jpg"
        alt="A food dish"
        height={512}
        width={512}
        className="h-min w-full rounded-xl xl:w-1/2"
      ></Image>
      {/* make into clues component, only needs access to the amountof guesses made */}
      <aside className="flex grow justify-center pb-32 pt-4 text-center text-base xl:pb-0 xl:pt-0">
        <ul className="flex w-full flex-col gap-4 xl:w-11/12">
          <li className="border-tertiary rounded-xl border-2 p-2 shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
            inventore vitaeatem iure animi deleniti aspernatur ipsam!
          </li>
          <li className="border-tertiary rounded-xl border-2 p-2 shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
            inventore vitae cum nisi impedit est architecto ab sunt tempore, ad
            reprehenderit voluptatem iure animi deleniti aspernatur ipsam!
          </li>
          <li className="border-tertiary rounded-xl border-2 p-2 shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
            inventore vitae cumque quo rerum nisi impedit est architecto ab sunt
            ehenderit voluptatem iure animi delen
          </li>
          <li className="border-tertiary rounded-xl border-2 p-2 shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
            inventore quo rerum nisi impedit est architecto ab sunt tempore, ad
            reprehenderit voluptatem iure animi deleniti aspernatur ipsam!
          </li>
          <li className="border-tertiary rounded-xl border-2 p-2 shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit
            inventore vitae cumque quo rerum nisi impedit est architecto ab sunt
            tempore, ad repvoluptatem iure animi deleniti aspernatur
          </li>
        </ul>
      </aside>
      {/* make into search field component, need to create a context for amount of guesses made */}
      <form className="bg-tertiary fixed bottom-0 left-0 mb-4 ms-4 flex h-min w-fit flex-col items-center rounded-xl p-4 xl:absolute">
        <header className="flex w-full justify-between px-2">
          <h3>guesses remaining: 3</h3>
          <button type="button">
            <Image
              alt="dropdown button"
              src="/placeholder.svg"
              height={16}
              width={16}
              className="inline-block"
            ></Image>
          </button>
        </header>
        <ul>
          <li>Sweden</li>
          <li>Finland</li>
          <li>Denmark</li>
        </ul>
        {/* <label htmlFor="country-search" className="pb-4">
          Guess the country of origin of this dish!
        </label> */}
        <input
          type="text"
          name="country-search"
          id="country-search"
          className="w-full rounded-xl p-2"
        />
      </form>
    </main>
  )
}
