import SearchPanel from '@/components/SearchPanel'
import { setOpen } from '@/stores/useSearchPanel'
import { expanded, setExpanded } from '@/stores/useTrendingPanel'
import { Motion } from '@motionone/solid'
import clsx from 'clsx'
import { spring } from 'motion'
import { Icon } from 'solid-heroicons'
import { arrowLeft } from 'solid-heroicons/outline'
import { Component, createEffect, onCleanup } from 'solid-js'
import 'solid-slider/slider.css'

const sliders = [
  {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2022/11/29/16/51/sheep-7624863_1280.jpg',
    url: '#',
  },
  {
    id: 2,
    image: 'https://cdn.pixabay.com/photo/2021/01/03/13/55/christmas-tree-5884606_1280.jpg',
    url: '#',
  },
  {
    id: 3,
    image: 'https://cdn.pixabay.com/photo/2022/12/04/09/58/fern-7634042_1280.jpg',
    url: '#',
  },
]

const TrendingPanel: Component = () => {
  const handleClick = () => {
    setExpanded(!expanded())
  }

  const handleFocus = () => {
    setExpanded(false)
    setOpen(true)
  }

  let ref: HTMLDivElement | undefined

  const handleClickOutSide = (e: MouseEvent) => {
    if (ref && !ref.contains(e.target as Node)) {
      // if initialized and clicked outside
      setExpanded(false)
    }
    return
  }

  createEffect(() => {
    if (expanded()) {
      document.addEventListener('click', handleClickOutSide)
    }
    onCleanup(() => document.removeEventListener('click', handleClickOutSide))
  }, [expanded()])

  return (
    <>
      <Motion.div
        ref={ref}
        class={clsx(
          'absolute z-40 left-2/3 top-0 w-2/3 h-screen bg-white/20 backdrop-blur-sm rounded-tl-2xl rounded-bl-2xl p-8 flex flex-col',
          'translate-x-1/3',
          'overflow-y-auto overflow-x-hidden'
        )}
        animate={{
          x: expanded() ? '-50%' : '0%', // 50% of the parent width
        }}
        transition={{
          duration: 1,
          easing: spring({
            damping: 18,
          }),
        }}
      >
        <div class='flex items-center mb-4 justify-between'>
          <div class='flex'>
            <Motion.button
              aria-label={expanded() ? 'close' : 'open'}
              onClick={handleClick}
              class='mr-4'
              animate={{
                rotate: expanded() ? 180 : 0,
              }}
              transition={{
                duration: 0.8,
              }}
              tabIndex={-1}
            >
              <Icon path={arrowLeft} width='20' />
            </Motion.button>
            <h2 class='text-2xl font-bold prose'>Discover</h2>
          </div>
          <input
            type='search'
            placeholder='find your favorites...'
            class='bg-transparent p-2 rounded border-[1px] border-white/40' // click to open search panel
            onFocus={handleFocus}
            tabIndex={-1}
          />
        </div>

        {/* <div class='aspect-video'>
        <Slider
          options={{ loop: true, vertical: true, slides: { spacing: 0 } }}
          //  plugins={[autoplay(1500, {})]}
          // thumbnail support see @https://github.com/davedbase/solid-slider#roadmap
        >
          <For each={sliders}>
            {(slide) => (
              <a href={slide.url}>
                <img
                  src={slide.image}
                  alt=''
                  class='object-cover w-full aspect-video overflow-hidden rounded-2xl' // todo fix this
                />
              </a>
            )}
          </For>
        </Slider>
      </div> */}

        <div>
          <h3 class='text-xl font-bold mt-8'>Trending Songs</h3>
        </div>
      </Motion.div>
      <SearchPanel />
    </>
  )
}

export default TrendingPanel
