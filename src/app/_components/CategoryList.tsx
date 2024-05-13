import CategoryButton from './CategoryButton'

export default function CategoryList(props: {
  categories: {
    altText: string
    pathName: string
  }[]
}) {
  return (
    <ul className="flex w-min gap-2 p-2">
      {props.categories.map((category) => {
        return (
          <CategoryButton
            key={category.pathName}
            altText={category.altText}
            pathName={category.pathName}
          />
        )
      })}
    </ul>
  )
}
