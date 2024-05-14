import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryList from '@/app/_components/CategoryList'

const categories = [
  { altText: 'an svg of a hanburger', pathName: 'dishes' },
  { altText: 'an svg of the leaning tower of pisa', pathName: 'landmarks' },
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
})
