import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { Song } from './usePlayerState'

export const [open, setOpen] = createSignal<boolean>(false)

export type SearchState = {
  searchString: string
  searchResults: Song[]
}

export const [searchState, setSearchState] = createStore<SearchState>({
  searchString: '',
  searchResults: [],
})
