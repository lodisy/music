import { Song } from '@/stores/usePlayerState'
import clsx from 'clsx'
import { Icon } from 'solid-heroicons'
import { backward, forward, playCircle } from 'solid-heroicons/outline'
import { Component, Match, Switch } from 'solid-js'

export type PlayerMode = 'mini' | 'full' | 'default'

const Player: Component<{
  mode: PlayerMode
  song: Song
}> = (props) => {
  return (
    <Switch>
      <Match when={props.mode == 'full'}>
        <div
          class={clsx(
            'bg-gradient-to-tr from-green-400 to-blue-800 z-10 absolute right-0 top-0 rounded-tl-2xl rounded-tr-2xl'
          )}
          style={{
            width: `calc(100% - 60px)`,
            height: `calc(100% - 4rem)`,
          }}
        >
          <div class='grid place-items-center'></div>
        </div>
      </Match>
      <Match when={props.mode == 'mini'}>
        <MiniPlayer song={props.song} />
      </Match>
    </Switch>
  )
}

export default Player

export const MiniPlayer: Component<{ song: Song | undefined }> = ({ song }) => {
  return (
    <div class='flex px-6 items-center overflow-hidden z-40 w-full h-16 fixed bottom-0'>
      <div class='flex gap-3 w-40 justify-between'>
        <Icon path={backward} class='w-24' />
        <Icon path={playCircle} class='w-24' />
        <Icon path={forward} class='w-24' />
      </div>
    </div>
  )
}
