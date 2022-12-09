import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import clsx from 'clsx'
import { JSX } from 'solid-js'

type Props = {
  children: JSX.Element
}

const RootLayout = (props: Props) => {
  return (
    <div
      class={clsx(
        'z-0 bg-gradient-to-tl from-purple-600 to-blue-900 flex w-screen h-screen overflow-hidden'
      )}
    >
      <Navbar />
      <div class='rounded-2xl bg-white/10 overflow-hidden h-screen w-full'>
        {props.children}
        <Player />
      </div>
    </div>
  )
}

export default RootLayout
