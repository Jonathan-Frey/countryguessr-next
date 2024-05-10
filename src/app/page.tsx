import CategoryList from './_components/CategoryList'

const categories = [{ displayName: 'Dishes', pathName: 'dishes' }]

export default function Page() {
  return (
    <main className="flex h-full w-full max-w-screen-md self-center">
      <CategoryList categories={categories} />
    </main>
  )
}
