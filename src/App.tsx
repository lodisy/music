import { Route, Routes, useMatch } from '@solidjs/router'
import clsx from 'clsx'
import { Match, Show, Switch } from 'solid-js'
import Navbar from './components/Navbar'
import { MiniPlayer } from './components/Player'
import TrendingPanel from './components/TrendingPanel'
import Analytics from './pages/Analytics'
import Home from './pages/Home'
import Library from './pages/Library'
import Settings from './pages/Settings'
import { playerState } from './stores/usePlayerState'
import { settings } from './stores/useSettings'

function App() {
  const { status, song } = playerState

  const { darkMode, enableTrendingPage } = settings

  // createShortcut(['Shift', 'Meta', 'S'], () => {
  //   alert('shortcut')
  // })

  const settingsPath = useMatch(() => '/settings')
  const homePath = useMatch(() => '/')

  return (
    <div
      class={clsx(
        'z-0 bg-gradient-to-tl from-purple-600 to-blue-900 flex w-screen h-screen overflow-hidden'
      )}
    >
      <Navbar />
      <div class='rounded-tl-2xl rounded-bl-2xl bg-white/10 backdrop-blur-sm overflow-hidden h-screen w-full'>
        <Routes>
          {/**
           * // todo add a bit transition time for page animation
           */}
          <Route path='/' component={Home} />
          <Route path='/analytics' component={Analytics} />
          <Route path='/library' component={Library} />
          <Route path='/settings' component={Settings} />
        </Routes>
        {status && <MiniPlayer song={song} />}
      </div>
      <Show when={enableTrendingPage != 'none' && !Boolean(settingsPath())}>
        <Switch>
          <Match when={enableTrendingPage == 'all'}>
            <TrendingPanel />
          </Match>
          <Match when={enableTrendingPage == 'onlyHome' && Boolean(homePath())}>
            <TrendingPanel />
          </Match>
        </Switch>
      </Show>
    </div>
  )
}

export default App
