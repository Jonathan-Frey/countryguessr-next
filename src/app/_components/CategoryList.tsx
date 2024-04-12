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
    <ul className="m-2 flex w-full max-w-lg flex-col gap-2">
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
