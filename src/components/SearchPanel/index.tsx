import { open, searchState, setOpen, setSearchState } from '@/stores/useSearchPanel'
import { Motion, Presence } from '@motionone/solid'
import { createShortcut } from '@solid-primitives/keyboard'
import clsx from 'clsx'
import { spring } from 'motion'
import { Icon } from 'solid-heroicons'
import { magnifyingGlass } from 'solid-heroicons/outline'
import { Component, createEffect, onCleanup, Show } from 'solid-js'
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
    <Portal>
      <Presence exitBeforeEnter>
        <Show when={open()}>
          <Motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
            }}
            ref={overlayRef}
            class={clsx(
              'fixed left-0 right-0 top-0 bottom-0 w-full h-full bg-white/10 backdrop-blur-sm z-[55]',
              'grid place-items-center'
            )}
          >
            <Motion.div
              animate={{
                y: 30,
              }}
              initial={{
                y: 0,
              }}
              exit={{
                y: 0,
              }}
              transition={{
                easing: spring(),
              }}
              class={clsx(
                'rounded-2xl p-4 ',
                'z-[60]',
                'w-1/2 h-2/3',
                'bg-white/80',
                'flex items-center flex-col',
                'shadow-lg'
              )}
            >
              <SearchBar ref={ref} />
            </Motion.div>
          </Motion.div>
        </Show>
      </Presence>
    </Portal>
  )
}

export default SearchPanel

const SearchBar: Component<{
  ref: HTMLInputElement | undefined
}> = ({ ref }) => {
  const { searchString } = searchState

  //todo debounce
  const handleInput = (e: Event) => {
    setSearchState({
      //@ts-ignore
      searchString: e.target.value,
    })
  }

  // todo debounce
  const handleSearch = (
    e: KeyboardEvent & {
      currentTarget: HTMLInputElement
      target: Element
    }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log(searchString)
    }
  }

  return (
    <div class='flex gap-2 rounded-2xl py-2 px-4 justify-around w-[200px]'>
      <Icon path={magnifyingGlass} width='20' />
      <input
        id='search'
        ref={ref}
        type='search'
        value={searchString}
        placeholder='search...'
        onChange={handleInput}
        class={clsx('bg-transparent', 'w-full', 'border-none')}
        onKeyDown={handleSearch}
      />
    </div>
  )
}
