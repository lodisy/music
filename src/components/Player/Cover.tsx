import clsx from 'clsx'
import type { Component } from 'solid-js'

const Cover: Component<{ src: string; mode: 'full' | 'mini' }> = (props) => {
  return (
    <div>
      <img
        src={props.src}
        alt='cover-image'
        class={clsx('object-cover', props.mode === 'full' ? 'w-full h-96' : 'w-24 h-24')}
      />
    </div>
  )
}

export default Cover
