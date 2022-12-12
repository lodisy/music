import { render } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import Navbar from '.'

test('<>Navbar</>', () => {
  test('it will render a navbar', () => {
    const { getByText } = render(() => <Navbar />)

    expect(getByText('Home')).toBeInTheDocument()
  })
})
