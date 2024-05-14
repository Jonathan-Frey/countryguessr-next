import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryButton from '@/app/_components/CategoryButton'

const props = {
  altText: 'an svg of an hamburger',
  pathName: 'dishes',
}

describe('Category Button', () => {
  it('renders without crashing', () => {
    render(<CategoryButton {...props} />)
  })

  it('renders a Link with the correct href', () => {
    render(<CategoryButton {...props} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/${props.pathName}`)
  })
})
