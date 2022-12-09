import { settings } from '@/stores/useSettings'
import { Component, Index } from 'solid-js'

const Settings: Component = () => {
  const { enableTrendingPage } = settings

  //todo

  return (
    <div class='flex flex-col p-8 z-0'>
      <h1 class='prose font-bold text-2xl'>Settings</h1>
      <div class='flex'>
        <div>
          <h2 class='prose'>Enable Trending Page?</h2>
        </div>
        <Index each={['onlyHome', 'all', 'none']}>
          {(value) => (
            <div class='flex gap-2 items-center'>
              <input
                type='radio'
                value={value()}
                // onClick={handleCheck}
                checked={enableTrendingPage === value()}
              />
              <span>{value}</span>
            </div>
          )}
        </Index>
      </div>
    </div>
  )
}

export default Settings
