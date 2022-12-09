import { Route, Routes } from '@solidjs/router'
import clsx from 'clsx'
import Navbar from './components/Navbar'
import { MiniPlayer } from './components/Player'
import Analytics from './pages/Analytics'
import Home from './pages/Home'
import Library from './pages/Library'
import Settings from './pages/Settings'
import { playerState } from './stores/usePlayerState'

function App() {
  const { status, song } = playerState

  return (
    <div
      class={clsx(
        'z-0 bg-gradient-to-tl from-purple-600 to-blue-900 flex w-screen h-screen overflow-hidden'
      )}
    >
      <Navbar />
      <div class='rounded-tl-2xl rounded-bl-2xl bg-white/10 backdrop-blur-sm overflow-hidden h-screen w-full'>
        <Routes>
          <Route path='/' component={Home} />
          <Route path='/analytics' component={Analytics} />
          <Route path='/library' component={Library} />
          <Route path='/settings' component={Settings} />
        </Routes>
        {status && <MiniPlayer song={song} />}
      </div>
    </div>
  )
}

export default App
