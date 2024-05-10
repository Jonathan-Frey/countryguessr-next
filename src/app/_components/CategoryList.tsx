import CategoryButton from './CategoryButton'

export default function CategoryList(props: {
  categories: {
    displayName: string
    pathName: string
  }[]
}) {
  return (
    <ul className="flex w-full flex-wrap p-4">
      {props.categories.map((category) => {
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
