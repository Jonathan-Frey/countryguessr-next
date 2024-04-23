import CategoryButton from './CategoryButton'

interface Category {
  displayName: string
  pathName: string
}

interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="m-2 flex w-11/12 max-w-screen-2xl flex-col xl:w-2/3">
      {categories.map((category) => {
        return (
          <CategoryButton
            key={category.pathName}
            displayName={category.displayName}
            pathName={category.pathName}
          />
        )
      })}
    </ul>
  )
}
