import { fireEvent, render } from '@solidjs/testing-library'
import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import TrendingPanel from '.'

test('<TrendingPanel />', () => {
  test('it will render a panel with a button', () => {
    const { getByText } = render(() => <TrendingPanel />)

    expect(getByText('Trending Songs')).toBeInTheDocument()
    expect(getByText('Trending Songs')).contains('button')
  })

  test('the panel should be expanded or closed when toggle the button', () => {
    const { getByText, getByRole } = render(() => <TrendingPanel />)

    const button = getByRole('button', {
      name: '/open/i',
    })

    const firstWidthClosed = getByText('Trending Songs').clientWidth

    expect(button).toBeInTheDocument()
    // open the panel
    fireEvent.click(button)

    const firstWidthOpen = getByText('Trending Songs').clientWidth

    expect(firstWidthOpen).toBeGreaterThan(firstWidthClosed)

    expect(firstWidthOpen / firstWidthClosed).toBe(2)

    // now close the panel

    fireEvent.click(button)

    const secondWidthClosed = getByText('Trending Songs').clientWidth

    expect(secondWidthClosed).toBeLessThan(firstWidthOpen)

    expect(secondWidthClosed / firstWidthOpen).toBe(0.5)

    expect(secondWidthClosed).toBe(firstWidthClosed)
  })
})
