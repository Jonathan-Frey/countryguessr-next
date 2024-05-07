import CategoryList from './_components/CategoryList'

const categories = [{ displayName: 'Dishes', pathName: 'dishes' }]

export default function Page() {
  return (
    <main className="flex h-full w-full max-w-screen-2xl flex-col items-center self-center">
      <h1 className=" my-4 text-2xl">Guess Country By Category</h1>
      <CategoryList categories={categories} />
    </main>
  )
}
