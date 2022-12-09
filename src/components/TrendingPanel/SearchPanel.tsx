import { open, searchState, setOpen, setSearchState } from '@/stores/useSearchPanel'
import { createShortcut } from '@solid-primitives/keyboard'
import clsx from 'clsx'
import { Icon } from 'solid-heroicons'
import { magnifyingGlass } from 'solid-heroicons/outline'
import { Component, createEffect, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'

const SearchPanel: Component = () => {
  createShortcut(
    ['Escape'],
    () => {
      setOpen(false)
    },
    { preventDefault: false, requireReset: true }
  )

  let ref: HTMLInputElement | undefined

  let overlayRef: HTMLDivElement | undefined

  const handleClickOutside = (e: MouseEvent) => {
    if (overlayRef && e.target === overlayRef) {
      setOpen(false)
    }
    return
  }

  createEffect(() => {
    if (open()) {
      setTimeout(() => ref?.focus(), 600)
      document.addEventListener('click', handleClickOutside)
    }
  }, [open()])

  onCleanup(() => document.removeEventListener('click', handleClickOutside))

  return (
    <>
      {open() && (
        <Portal>
          <div
            ref={overlayRef}
            class='fixed left-0 right-0 top-0 bottom-0 w-full h-full bg-white/10 backdrop-blur-sm z-[55]'
          ></div>
          <div
            class={clsx(
              'rounded-2xl p-4 ',
              'z-[60] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-1/2 h-2/3',
              'bg-white/50',
              'flex items-center flex-col'
            )}
          >
            <SearchBar ref={ref} />
          </div>
        </Portal>
      )}
    </>
  )
}

export default SearchPanel

const SearchBar: Component<{
  ref: HTMLInputElement | undefined
}> = ({ ref }) => {
  const { searchString } = searchState
  // press enter to search

  createShortcut(
    ['Enter'],
    () => {
      if (searchString) {
        // and if focused
        // todo send query to rust backend
        console.log(searchString)
      }
    },
    {
      preventDefault: true,
    }
  )

  const handleInput = (e: Event) => {
    setSearchState({
      //@ts-ignore
      searchString: e.target.value,
    })
  }

  return (
    <div class='flex gap-2 rounded-2xl py-2 px-4 justify-around w-[200px]'>
      <Icon path={magnifyingGlass} width='20' />
      <input
        ref={ref}
        type='search'
        value={searchString}
        placeholder='search...'
        onChange={handleInput}
        class={clsx('bg-transparent', 'w-full', 'border-none')}
      />
    </div>
  )
}
