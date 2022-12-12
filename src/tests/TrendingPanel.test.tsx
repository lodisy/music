import TrendingPanel from '@/components/TrendingPanel'
import { render } from '@solidjs/testing-library'
import { expect, test } from 'vitest'

test('<>TrendingPanel</>', () => {
  test('it will render a panel', () => {
    const { getByText } = render(() => <TrendingPanel />)

    expect(getByText('Trending Songs')).toBeTruthy()
  })
})
