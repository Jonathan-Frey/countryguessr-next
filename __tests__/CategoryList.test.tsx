import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryList from '@/app/_components/CategoryList'

const categories = [
  { displayName: 'Dishes', pathName: 'dishes' },
  { displayName: 'Dances', pathName: 'dances' },
  { displayName: 'Clothing', pathName: 'clothing' },
  { displayName: 'Landmarks', pathName: 'landmarks' },
  { displayName: 'Festivals', pathName: 'festivals' },
]

describe('Category List', () => {
  it('renders without crashing', () => {
    render(<CategoryList categories={categories} />)
  })

  it('renders the correct number of CategoryButton components', () => {
    render(<CategoryList categories={categories} />)
    const categoryButtons = screen.getAllByTestId('category-button')
    expect(categoryButtons).toHaveLength(categories.length)
  })

  it('renders each CategoryItem with the correct props', () => {
    render(<CategoryList categories={categories} />)
    categories.forEach((category) => {
      expect(screen.getByText(category.displayName)).toBeInTheDocument()
    })
  })
})
