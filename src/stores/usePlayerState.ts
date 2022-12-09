import { createStore } from 'solid-js/store'

export type PlayerStatus = 'playing' | 'paused' | 'stopped' | undefined // undefined means not played yet

export type Song = {
  id: string
  title: string
  artist?: string
  album?: string
  duration?: number
  coverUrl?: string
  url: string
}

export type PlayerState = {
  status: PlayerStatus
  currentTime: number | undefined
  song: Song | undefined
}

export const [playerState, setPlayerState] = createStore<PlayerState>({
  status: undefined,
  currentTime: undefined,
  song: undefined,
})
