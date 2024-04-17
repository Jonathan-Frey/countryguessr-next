import CategoryList from './_components/CategoryList'

const categories = [
  { displayName: 'Dishes', pathName: 'dishes' },
  { displayName: 'Dances', pathName: 'dances' },
  { displayName: 'Clothing', pathName: 'clothing' },
  { displayName: 'Landmarks', pathName: 'landmarks' },
  { displayName: 'Festivals', pathName: 'festivals' },
]

export default function Page() {
  return (
    <main className="flex h-full w-full max-w-2xl flex-col items-center self-center xl:max-w-screen-xl">
      <h1 className=" my-4 text-2xl">Guess Country By Category</h1>
      <CategoryList categories={categories} />
    </main>
  )
}
